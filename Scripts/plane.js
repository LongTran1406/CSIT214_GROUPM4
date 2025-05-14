// Global variables
let currentlySelectedSeat = null;

// Authentication functions
function showSignIn() {
    // Store the current page URL in sessionStorage
    sessionStorage.setItem('returnUrl', window.location.href);
    // The actual redirection will happen through the href attribute
}

function showSignUp() {
    // Store the current page URL in sessionStorage
    sessionStorage.setItem('returnUrl', window.location.href);
    // Add a flag to indicate signup should be shown
    sessionStorage.setItem('showSignUp', 'true');
    // The actual redirection will happen through the href attribute
}

// Seat selection functions
function selectSeat(seatId) {
    // Get the seat element
    const seats = document.querySelectorAll('.seat');
    const clickedSeat = Array.from(seats).find(seat => seat.textContent === seatId);
    
    // If already unavailable, don't do anything
    if (clickedSeat.classList.contains('unavailable')) {
        return;
    }
    
    // If there's a currently selected seat, unselect it
    if (currentlySelectedSeat) {
        currentlySelectedSeat.classList.remove('selected');
    }
    
    // Select the new seat
    clickedSeat.classList.add('selected');
    currentlySelectedSeat = clickedSeat;
    
    // Update seat information in the sidebar
    updateSeatInformation(clickedSeat, seatId);
}

function updateSeatInformation(seat, seatId) {
    document.getElementById('no-seat-selected').style.display = 'none';
    document.getElementById('seat-details').style.display = 'block';
    document.getElementById('selected-seat').textContent = seatId;
    
    const isBusinessClass = seat.classList.contains('business');
    const seatClass = isBusinessClass ? 'Business' : 'Economy';
    document.getElementById('selected-class').textContent = seatClass;
    
    // Determine seat position
    let position = '';
    if (seatId.includes('A') || seatId.includes('F')) {
        position = 'Window';
    } else if (seatId.includes('C') || seatId.includes('D')) {
        position = 'Aisle';
    } else {
        position = 'Middle';
    }
    document.getElementById('seat-position').textContent = position;
    
    // Set price based on class
    const price = isBusinessClass ? '$75.00' : '$25.00';
    document.getElementById('seat-price').textContent = price;
    document.getElementById('seat-selection-price').textContent = price;
    
    // Update total price
    const basePriceAndFees = 586.50;
    const seatPrice = isBusinessClass ? 75.00 : 25.00;
    const totalPrice = basePriceAndFees + seatPrice;
    document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
}

// Payment and form handling
function continueToPayment() {
    if (!currentlySelectedSeat) {
        alert('Please select a seat before continuing.');
        return;
    }
    
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    
    if (!nameInput || !emailInput) {
        alert('Please fill in all required passenger information.');
        return;
    }
    
    alert('Proceeding to payment... (This is a demo, payment processing is not implemented)');
} 