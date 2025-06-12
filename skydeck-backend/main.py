from fastapi import FastAPI
from db.routes import db_router  # or from folder.routes if in subfolder
from weather.routes import weather_router

app = FastAPI()

app.include_router(db_router)
app.include_router(weather_router)

