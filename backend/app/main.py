from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import incidents, insurer

app = FastAPI(
    title="Protectorium MVP Backend",
    version="1.0.0"
)

# CORS – разрешаем фронтенду обращаться к API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Можно ограничить позже
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роуты
app.include_router(incidents.router)
app.include_router(insurer.router)

@app.get("/")
def root():
    return {"status": "Protectorium backend is running"}
