import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AddSaree = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!image) {
      setMessage("Please upload a saree image.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      data.append("image", image);
      data.append("sellerId", user.uid); // 🔐 seller binding

      const res = await fetch("http://localhost:5000/api/sarees", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Upload failed");

      setMessage("Saree added successfully.");

      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
      });
      setImage(null);
      setPreview(null);
      document.getElementById("imageUpload").value = "";
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold text-[#7b1e1e] mb-10">
          Add New Saree
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-10 rounded-2xl shadow-md"
        >
          {/* IMAGE */}
          <div>
            <p className="font-medium mb-3">Saree Image</p>
            <div className="border-2 border-dashed border-[#e5d3a3] rounded-xl p-6 text-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-72 object-cover rounded-lg mb-4"
                />
              ) : (
                <p className="text-gray-500 mb-4">
                  Upload a high-quality saree image
                </p>
              )}

              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer px-6 py-2 border border-[#7b1e1e] text-[#7b1e1e] rounded-lg hover:text-[#c9a24d] hover:border-[#c9a24d]"
              >
                Choose Image
              </label>
            </div>
          </div>

          {/* FORM */}
          <div className="space-y-5">
            <input
              name="name"
              placeholder="Saree Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Category</option>
              <option value="Kanjeevaram">Kanjeevaram</option>
              <option value="Banarasi">Banarasi</option>
              <option value="Chanderi">Chanderi</option>
              <option value="Mysore Silk">Mysore Silk</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                placeholder="Price (₹)"
                value={formData.price}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2"
              />
            </div>

            <textarea
              name="description"
              placeholder="Description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />

            {message && (
              <p className="text-sm text-[#7b1e1e]">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7b1e1e] text-white py-3 rounded-lg font-semibold hover:bg-[#5e1515]"
            >
              {loading ? "Uploading…" : "Add Saree"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSaree;
