
        function showTab(tabName) {
           
            var tabs = document.querySelectorAll('.tab-content');
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');
            }

            var buttons = document.querySelectorAll('.nav-tab');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('active');
            }

            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }

        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var contact = document.getElementById('contact').value;
            var gender = document.getElementById('gender').value;
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirmPassword').value;
            
            var isValid = true;
            clearAllErrors();

            if (name === '') {
                showError('name', 'Name is required');
                isValid = false;
            } else if (!/^[A-Za-z\s]+$/.test(name)) {
                showError('name', 'Name can only contain letters');
                isValid = false;
            }

            if (email === '') {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError('email', 'Please enter a valid email');
                isValid = false;
            }

            if (contact === '') {
                showError('contact', 'Contact number is required');
                isValid = false;
            } else if (!/^\d{10}$/.test(contact)) {
                showError('contact', 'Contact must be exactly 10 digits');
                isValid = false;
            }

            if (gender === '') {
                showError('gender', 'Please select a gender');
                isValid = false;
            }

            if (password === '') {
                showError('password', 'Password is required');
                isValid = false;
            } else if (password.length < 6) {
                showError('password', 'Password must be at least 6 characters');
                isValid = false;
            } else if (!/[A-Z]/.test(password)) {
                showError('password', 'Password must contain an uppercase letter');
                isValid = false;
            } else if (!/[a-z]/.test(password)) {
                showError('password', 'Password must contain a lowercase letter');
                isValid = false;
            } else if (!/[0-9]/.test(password)) {
                showError('password', 'Password must contain a number');
                isValid = false;
            } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                showError('password', 'Password must contain a special character');
                isValid = false;
            }

            if (confirmPassword === '') {
                showError('confirmPassword', 'Please confirm your password');
                isValid = false;
            } else if (password !== confirmPassword) {
                showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }

            if (isValid) {
                document.getElementById('successMessage').style.display = 'block';
                document.getElementById('registrationForm').reset();
                
                setTimeout(function() {
                    document.getElementById('successMessage').style.display = 'none';
                }, 3000);
            }
        });

        function showError(fieldId, message) {
            document.getElementById(fieldId).classList.add('error');
            document.getElementById(fieldId + 'Error').textContent = message;
            document.getElementById(fieldId + 'Error').style.display = 'block';
        }

        function clearAllErrors() {
            var fields = ['name', 'email', 'contact', 'gender', 'password', 'confirmPassword'];
            for (var i = 0; i < fields.length; i++) {
                document.getElementById(fields[i]).classList.remove('error');
                document.getElementById(fields[i] + 'Error').style.display = 'none';
            }
        }

        var currentSlide = 0;
        var slides = document.querySelectorAll('.carousel-slide');

        function changeSlide(direction) {

            slides[currentSlide].classList.remove('active');
            

            currentSlide = currentSlide + direction;
            

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            
            slides[currentSlide].classList.add('active');
            
            clearStars();
        }
        var stars = document.querySelectorAll('.star');
        var currentRating = 0;

        function rateImage(rating) {

            if (currentRating === rating) {
                currentRating = 0;
            } else {
                currentRating = rating;
            }
            
            updateStars();
        }

        function updateStars() {
            for (var i = 0; i < stars.length; i++) {
                if (i < currentRating) {
                    stars[i].classList.add('active');
                } else {
                    stars[i].classList.remove('active');
                }
            }
        }

        function clearStars() {
            currentRating = 0;
            updateStars();
        }

        for (var i = 0; i < stars.length; i++) {
            stars[i].addEventListener('mouseenter', function() {
                var hoverRating = Array.from(stars).indexOf(this) + 1;
                for (var j = 0; j < stars.length; j++) {
                    if (j < hoverRating) {
                        stars[j].classList.add('active');
                    } else {
                        stars[j].classList.remove('active');
                    }
                }
            });
        }

        document.querySelector('.rating-container').addEventListener('mouseleave', function() {
            updateStars();
        });
