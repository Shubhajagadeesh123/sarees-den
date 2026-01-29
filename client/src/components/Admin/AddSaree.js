import { useState } from "react";

const AddSaree = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }

    try {
      setLoading(true);

      // 1. Prepare FormData (Matches your server's upload.single('image'))
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("description", formData.description);
      data.append("image", image); // The key 'image' must match req.file on server

      // 2. Send to your Node.js Server
      // Note: We don't set 'Content-Type' header; fetch handles it for FormData
      const response = await fetch("http://localhost:5000/api/sarees", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add saree");
      }

      alert("Saree Added Successfully to Database!");

      // 3. Reset Form
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
      });
      setImage(null);
      document.getElementById("imageUpload").value = "";

    } catch (error) {
      console.error("ADD SAREE ERROR:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#7b1e1e] mb-8 text-center">
          Add New Saree
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Saree Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select category</option>
              <option value="Kanjeevaram">Kanjeevaram</option>
              <option value="Banarasi">Banarasi</option>
              <option value="Chanderi">Chanderi</option>
              <option value="Mysore Silk">Mysore Silk</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Saree Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="cursor-pointer text-[#7b1e1e] font-semibold">
                Click to upload image
              </label>
              {image && <p className="mt-2 text-sm text-green-600">Selected: {image.name}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7b1e1e] text-white py-3 rounded-lg font-semibold hover:bg-[#5e1515] disabled:opacity-60"
          >
            {loading ? "Uploading to Server..." : "Add Saree"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSaree;