const validate = (formData) =>{
    const hasSymbols = /[^a-zA-Z0-9\s]+/;
    const urlValidation = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    const newErrors = {};
    if (hasSymbols.test(formData.name)) {
        newErrors.name = "Name cannot contain symbols";
    }
    if (!urlValidation.test(formData.imagen)) {
        newErrors.imagen = "Invalid URL";
    }
    // if (formData.minWeight < 5 || formData.minWeight > formData.maxWeight) {
    //     newErrors.minWeight = "The minimum weight should be between 5-20";
    // }
    // if (formData.maxWeight > 50 || formData.maxWeight < formData.minWeight) {
    //     newErrors.maxWeight = "The maximum weight should be between 20-50";
    // }
    // if (formData.minHeight < 10 || formData.minHeight > formData.maxHeight) {
    //     newErrors.minHeight = "The minimum height should be between 10-30";
    // }
    // if (formData.maxHeight > 100 || formData.maxHeight < formData.minHeight) {
    //     newErrors.maxHeight = "The maximum height should be between 30-100";
    // }
    if (formData.name === "") newErrors.name = "";
    if (formData.imagen === "") newErrors.imagen = "";
    // if (formData.minWeight === "") newErrors.minWeight = "";
    // if (formData.maxWeight === "") newErrors.maxWeight = "";
    // if (formData.minHeight === "") newErrors.minHeight = "";
    // if (formData.maxHeight === "") newErrors.maxHeight = "";
    return newErrors
}

export default validate