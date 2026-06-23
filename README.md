# Networks Telecommunications

# 🌐 Description:

Networks Telecommunications is a full-stack web platform developed with React on the front end and Django/Django REST Framework on the back end, designed to simulate the administration and monitoring of telecommunications infrastructure in a centralized environment.

The system allows administrators and authorized users to manage network assets such as cameras and routers, monitor their operational status, visualize their geographic location through interactive maps, and access detailed device information. The platform integrates multimedia management capabilities, including camera images and recordings, providing a realistic representation of surveillance and networking environments.

By combining asset administration, geolocation services, maintenance management, and infrastructure monitoring, the application delivers a scalable solution that reflects common workflows found in telecommunications and network operations centers (NOCs).

![Python](https://img.shields.io/badge/Python-3.12-blue)
![Django](https://img.shields.io/badge/Django-REST_Framework-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange)
![Leaflet](https://img.shields.io/badge/Leaflet-Geolocation-green)

---

# ⚙️ Tech Stack

Frontend
- React
- React Router
- Bootstrap
- Leaflet

Backend
- Django
- Django REST Framework

Database
- MySQL

Tools
- Git
- GitHub
- VS Code
- Django Admin

---

# 🗂️​ Features:

### Camera Management:

* Camera registration and administration
* Camera status monitoring
* Camera information management
* Camera image visualization
* Camera recording management
* Real-time geographic location tracking
* Camera maintenance management
* Device detail visualization

### Router Management:

* Router registration and administration
* Router status monitoring
* Router information management
* Network infrastructure tracking
* Router maintenance management
* Device detail visualization

### Geolocation System:

* Interactive maps powered by Leaflet
* Real-time visualization of cameras and routers
* Latitude and longitude management
* Geographic monitoring of network assets
* Infrastructure location tracking

### Maintenance Management:

* Maintenance record registration
* Maintenance history tracking
* Device maintenance monitoring
* Infrastructure lifecycle management

### Infrastructure Monitoring:

* Device operational status tracking
* Camera availability monitoring
* Router availability monitoring
* Centralized network overview
* Infrastructure asset management

### User Management:

* User authentication
* User profile management
* Protected routes
* Session persistence

### Administrative Dashboard:

* Camera administration panel
* Router administration panel
* Maintenance administration
* User management panel
* Infrastructure monitoring dashboard

---

# 🏗️ Technologies:

### Languages:

* Python
* JavaScript
* HTML5
* CSS3

### Frameworks & Libraries:

#### Front-End:

* React
* React Router
* Leaflet
* Bootstrap

#### Back-End:

* Django
* Django REST Framework

### Database:

* MySQL

### API & Communication:

* RESTful APIs
* Native Fetch API

### Development Tools:

* VS Code
* Git
* GitHub
* Django Admin

### Design & Collaboration:

* Draw.io
* Figma
* Trello

---

# 🛠️ Technical Highlights:

* RESTful API design using Django REST Framework.
* Relational database modeling with MySQL.
* Infrastructure asset management workflows.
* Interactive geolocation implementation using Leaflet.
* Real-time visualization of network devices.
* Camera and router administration system.
* Maintenance tracking and monitoring.
* Asynchronous data management using Fetch API.
* Separation of concerns between frontend and backend.
* Responsive and modular user interface architecture.
* Multimedia integration for camera recordings and images.

---

# 🔧 Installation Front-End:

```bash
git clone https://github.com/JuanDiegoCC02/Networks-Telecommunications.git
cd Networks-Telecommunications
cd FrontEnd

npm install
npm run dev
```

---

# 🔧 Installation Back-End:

```bash
cd BackEnd

pip install pipenv
pipenv install
pipenv shell

pip install django
pip install djangorestframework
pip install mysqlclient
pip install django-cors-headers

CREATE DATABASE networks_telecommunications;

python manage.py makemigrations
python manage.py migrate

python manage.py runserver
```

---

# 🧑‍💻 Credits:

Project Title: Networks Telecommunications

Author:
* Juan Diego Corella Camacho
