# app.py (endpoint replacement)
from fast_alpr import ALPR
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import tempfile, os, uvicorn, logging, base64, pprint

try:
    import numpy as np
except Exception:
    np = None

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("alpr")

# initialize once at startup (your existing model choices)
alpr = ALPR(
    detector_model="yolo-v9-t-384-license-plate-end2end",
    ocr_model="cct-xs-v1-global-model"
)

app = FastAPI(title="CARLA ANPR Service")

def serialize(obj):
    """
    Recursively convert obj into JSON-serializable Python primitives.
    Handles:
     - primitives (str/int/float/bool/None)
     - dicts, lists/tuples
     - numpy scalars/arrays (if numpy available)
     - bytes -> base64 string
     - objects with to_dict()
     - objects with __dict__
     - fallback: str(obj)
    """
    # primitives
    if obj is None or isinstance(obj, (str, int, float, bool)):
        return obj

    # dict
    if isinstance(obj, dict):
        return {str(k): serialize(v) for k, v in obj.items()}

    # list/tuple
    if isinstance(obj, (list, tuple, set)):
        return [serialize(v) for v in obj]

    # numpy types
    if np is not None:
        if isinstance(obj, np.generic):
            return obj.item()
        if isinstance(obj, np.ndarray):
            return obj.tolist()

    # bytes -> base64 string (useful for any in-memory images)
    if isinstance(obj, (bytes, bytearray)):
        try:
            return base64.b64encode(bytes(obj)).decode("ascii")
        except Exception:
            return None

    # has a to_dict() method? prefer that
    to_dict = getattr(obj, "to_dict", None)
    if callable(to_dict):
        try:
            return serialize(to_dict())
        except Exception:
            pass

    # dataclass-like or plain object with __dict__
    if hasattr(obj, "__dict__"):
        try:
            return serialize(vars(obj))
        except Exception:
            pass

    # fallback: try to convert to JSON-friendly basic types via str()
    try:
        return str(obj)
    except Exception:
        return None

@app.post("/recognize")
async def recognize_plate(image: UploadFile = File(...)):
    if image.content_type.split("/")[0] != "image":
        raise HTTPException(status_code=400, detail="not an image")

    tmp_path = None
    try:
        suffix = os.path.splitext(image.filename)[1] or ".jpg"
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(await image.read())
            tmp.flush()
            tmp_path = tmp.name

        try:
            alpr_results = alpr.predict(tmp_path)
        except Exception:
            log.exception("FastALPR inference error")
            raise HTTPException(status_code=500, detail="ALPR inference error")

        # debug info: log types and a pretty-printed representation
        log.info("ALPR returned type: %s", type(alpr_results))
        try:
            # avoid extremely long logs in prod; pprint only top-level
            log.debug("ALPR raw result (pprint):\n%s", pprint.pformat(alpr_results))
        except Exception:
            pass

        # convert to JSON-serializable structure
        converted = serialize(alpr_results)

        # ensure JSON-safe encoding for FastAPI (optional but helps)
        safe = jsonable_encoder({"results": converted})

        return JSONResponse(content=safe)

    finally:
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except Exception:
                log.warning("Could not remove temp file", exc_info=True)

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
