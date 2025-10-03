    Coop Program - More complete Django scaffold


    What's included:

    - Auth (register/login/logout)
    - Mahasiswa profile model and form
    - Lowongan model and listing
    - Konfirmasi Magang form with file upload
    - Templates and improved CSS

How to run:

1. Create virtualenv and install requirements:
   python -m venv env
   source env/bin/activate   (or env\Scripts\activate on Windows)
   pip install -r requirements.txt

2. Run migrations and create superuser:
   python manage.py migrate
   python manage.py createsuperuser

3. Start server:
   python manage.py runserver

4. Open http://127.0.0.1:8000/

Admin: http://127.0.0.1:8000/admin/ (use superuser account to seed Lowongan entries)
