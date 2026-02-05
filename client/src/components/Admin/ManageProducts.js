import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const ManageProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "sarees"),
      where("sellerId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this saree?")) {
      await deleteDoc(doc(db, "sarees", id));
    }
  };

  const handleUpdateStock = async (id, stock) => {
    const newStock = prompt("Enter new stock:", stock);
    if (newStock && !isNaN(newStock)) {
      await updateDoc(doc(db, "sarees", id), {
        stock: Number(newStock),
      });
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center text-gray-500">
        Loading inventory…
      </div>
    );

  if (products.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf5]">
        <p className="text-gray-500">
          No products added yet.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fffaf5] p-8">
      <div className="max-w-7xl mx-auto bg-white shadow border rounded">
        <div className="p-6 border-b">
          <h2 className="text-xl text-[#7b1e1e]">
            Inventory Management
          </h2>
          <p className="text-xs text-gray-400">
            Your products only
          </p>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-[#fffaf5] text-gray-500">
            <tr>
              <th className="p-4">Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th className="text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className={`border-t ${
                  p.stock < 3 ? "bg-red-50" : ""
                }`}
              >
                <td className="p-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-14 object-cover"
                  />
                </td>
                <td className="font-medium">{p.name}</td>
                <td>₹{p.price}</td>
                <td>
                  {p.stock}
                  {p.stock < 3 && (
                    <span className="text-red-500 text-xs ml-2">
                      Low
                    </span>
                  )}
                </td>
                <td className="text-right pr-4 space-x-2">
                  <button
                    onClick={() =>
                      handleUpdateStock(p.id, p.stock)
                    }
                    className="text-xs px-3 py-1 border hover:bg-black hover:text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-xs px-3 py-1 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
