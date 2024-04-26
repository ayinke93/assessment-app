document.addEventListener("DOMContentLoaded", function () {
	var dropZone = document.getElementById("drop-zone")
	var fileInput = document.getElementById("image-input")
	var fileNameDisplay = document.getElementById("file-name")
	var uploadButton = document.getElementById("upload-button")
	var loadingSpinner = document.getElementById("loading-container")
	const uploadSound = document.getElementById("upload-sound")

	function playSound() {
		uploadSound.play()
	}

	uploadButton.addEventListener("click", function () {
		fileInput.click() // Trigger the file input when button is clicked
	})

	// Event listener for file selection
	fileInput.addEventListener("change", function () {
		if (fileInput.files.length > 0) {
			playSound()
		}
		var file = fileInput.files[0]
		if (file) {
			var reader = new FileReader()
			reader.onload = function (e) {
				loadingSpinner.style.display = "block"
				setTimeout(function () {
					localStorage.setItem("uploadedImage", e.target.result) 
					loadingSpinner.style.display = "none"
					window.location.href = "result.html"
				}, 1000)
			}
			reader.readAsDataURL(file) // Read the file as a Data URL
		}
		updateFileName()
		uploadImage()
	})

	// Event listeners for drag and drop functionality
	dropZone.addEventListener("dragenter", preventDefaults, false)
	dropZone.addEventListener("dragover", preventDefaults, false)
	dropZone.addEventListener("dragleave", preventDefaults, false)
	dropZone.addEventListener("drop", handleDrop, false)

	dropZone.addEventListener("click", function () {
		fileInput.click()
	})

	// Function to prevent default drag and drop behavior
	function preventDefaults(e) {
		e.preventDefault()
		e.stopPropagation()
	}

	// Function to handle dropped files
	function handleDrop(e) {
		preventDefaults(e)
		playSound()
		var dt = e.dataTransfer
		var files = dt.files

		// Assign dropped files to the file input
		fileInput.files = files
		updateFileName()
		window.location.href = "result.html"
		uploadImage() // Automatically upload the image when dropped
	}

	function updateFileName() {
		var fileName = fileInput.files.length > 0 ? fileInput.files[0].name : ""
		fileNameDisplay.textContent = fileName
			? `Selected file: ${fileName}`
			: ""
	}

	// Function to upload image to the server
	function uploadImage() {
		if (fileInput.files.length > 0) {
			var file = fileInput.files[0]
			var reader = new FileReader()
			reader.onload = (e) => {
				
				document.getElementById("loading-container").style.display =
					"block"

				fetch(
					"https://jd7b8ye8c7.execute-api.eu-west-2.amazonaws.com/api/upload",
					{
						method: "POST",
						body: e.target.result, // Access result directly from the event target
						headers: new Headers({
							"Content-Type": "application/octet-stream",
						}),
						mode: "cors",
					},
				)
					.then((response) => response.json())
					.then((data) => {
						localStorage.removeItem("uploadedImageAnalysis") // Clear the previous data
						localStorage.setItem(
							"uploadedImageAnalysis",
							JSON.stringify(data),
						)
						window.location.href = "result.html"
					})
					.catch((error) => {
						console.error("Error:", error)
					})
					.finally(() => {
						document.getElementById(
							"loading-container",
						).style.display = "none"
					})
			}
			reader.readAsArrayBuffer(file)
		} else {
			alert("Please select an image to upload.")
		}
	}
})
