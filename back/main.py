import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import ServerSentEvent, EventSourceResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def progress_generat():
   
    for percent in [20, 40, 60, 80, 100]:
        await asyncio.sleep(1) 
        yield ServerSentEvent(data=str(percent), event="progress")
    yield ServerSentEvent(data="Done", event="complete")

@app.get("/event")
async def sse_endpoint():
    return EventSourceResponse(progress_generat())