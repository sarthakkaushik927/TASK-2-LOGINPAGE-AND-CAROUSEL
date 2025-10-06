// ========== TAB SWITCHING ==========
        function showTab(tabName) {
            // Hide all tabs
            var tabs = document.querySelectorAll('.tab-content');
            for (var i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');
            }

            // Remove active from all buttons
            var buttons = document.querySelectorAll('.nav-tab');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('active');
            }

            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }

        // ========== FORM VALIDATION ==========
        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get all input values
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var contact = document.getElementById('contact').value;
            var gender = document.getElementById('gender').value;
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirmPassword').value;
            
            var isValid = true;

            // Clear previous errors
            clearAllErrors();

            // Validate Name (no numbers or special characters)
            if (name === '') {
                showError('name', 'Name is required');
                isValid = false;
            } else if (!/^[A-Za-z\s]+$/.test(name)) {
                showError('name', 'Name can only contain letters');
                isValid = false;
            }

            // Validate Email
            if (email === '') {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError('email', 'Please enter a valid email');
                isValid = false;
            }

            // Validate Contact (10 digits only)
            if (contact === '') {
                showError('contact', 'Contact number is required');
                isValid = false;
            } else if (!/^\d{10}$/.test(contact)) {
                showError('contact', 'Contact must be exactly 10 digits');
                isValid = false;
            }

            // Validate Gender
            if (gender === '') {
                showError('gender', 'Please select a gender');
                isValid = false;
            }

            // Validate Password
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

            // Validate Confirm Password
            if (confirmPassword === '') {
                showError('confirmPassword', 'Please confirm your password');
                isValid = false;
            } else if (password !== confirmPassword) {
                showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }

            // If all validations pass
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

        // ========== CAROUSEL ==========
        var currentSlide = 0;
        var slides = document.querySelectorAll('.carousel-slide');

        function changeSlide(direction) {
            // Hide current slide
            slides[currentSlide].classList.remove('active');
            
            // Calculate new slide position
            currentSlide = currentSlide + direction;
            
            // Loop back to start/end
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            
            // Show new slide
            slides[currentSlide].classList.add('active');
            
            // Clear star rating
            clearStars();
        }

        // ========== STAR RATING ==========
        var stars = document.querySelectorAll('.star');
        var currentRating = 0;

        function rateImage(rating) {
            // If clicking same star, clear rating
            if (currentRating === rating) {
                currentRating = 0;
            } else {
                currentRating = rating;
            }
            
            // Update star display
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

        // Add hover effect for stars
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