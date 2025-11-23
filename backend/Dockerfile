# ========== Base image ==========
FROM python:3.11-slim

# ========== Work directory ==========
WORKDIR /app

# ========== Install Python deps ==========
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ========== Copy backend code ==========
COPY app ./app

# ========== Expose API port ==========
EXPOSE 8000

# ========== Run backend ==========
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
