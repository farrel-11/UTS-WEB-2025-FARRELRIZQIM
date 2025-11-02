// // src/components/BookForm.jsx
// import React, { useState, useEffect } from "react";

// function BookForm({ bookToEdit, onSubmit, onCancel }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     author: "",
//     rating: "",
//   });

//   useEffect(() => {
//     if (bookToEdit) {
//       // Populate with fields that backend uses: name, author, rating
//       setFormData({
//         name: bookToEdit.name || "",
//         author: bookToEdit.author || "",
//         rating: bookToEdit.rating !== undefined ? String(bookToEdit.rating) : "",
//       });
//     } else {
//       setFormData({ name: "", author: "", rating: "" });
//     }
//   }, [bookToEdit]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Basic validation already covered by required attributes; ensure proper types
//     const payload = {
//       ...formData,
//       // If rating is numeric-like, convert to number
//       rating:
//         formData.rating !== "" && !isNaN(Number(formData.rating))
//           ? Number(formData.rating)
//           : formData.rating,
//     };
//     onSubmit(payload);
//     // clear form only if not editing (parent will clear bookToEdit)
//     if (!bookToEdit) {
//       setFormData({ name: "", author: "", rating: "" });
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-600">
//         {bookToEdit ? "Edit Book" : "Add New Book"}
//       </h2>

//       <form onSubmit={handleSubmit} className="mb-4">
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">
//             Judul Buku:
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Masukkan Judul Buku"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">
//             Penulis:
//           </label>
//           <input
//             type="text"
//             name="author"
//             value={formData.author}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Masukkan nama penulis"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">
//             Rating (angka 1-5 atau kata: excellent/average/bad):
//           </label>
//           <select
//               name='rating'
//               value={formData.rating}
//               onChange={handleChange}
//               className='w-full px-5 py-3 border-2 border-gray-300 rounded-xl appearance-none bg-white focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500 transition-all duration-200 cursor-pointer shadow-sm font-semibold text-gray-700 group-hover:border-yellow-400'
//               required
//             >
//               <option value="excellent">⭐⭐⭐⭐⭐ Excellent (Sangat Bagus)</option>
//               <option value="average">⭐⭐⭐ Average (Biasa Saja)</option>
//               <option value="bad">⭐ Bad (Kurang Bagus)</option>
//             </select>
//         </div>

//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
//           >
//             {bookToEdit ? "Simpan Perubahan" : "Tambah Buku"}
//           </button>

//           {bookToEdit ? (
//             <button
//               type="button"
//               onClick={onCancel}
//               className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
//             >
//               Batal
//             </button>
//           ) : (
//             <button
//               type="button"
//               onClick={() => setFormData({ name: "", author: "", rating: "" })}
//               className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition duration-200"
//             >
//               Reset
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default BookForm;

import React, { useState, useEffect } from "react";

function BookForm({ bookToEdit, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    rating: "average",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        name: bookToEdit.name || "",
        author: bookToEdit.author || "",
        rating: bookToEdit.rating !== undefined ? String(bookToEdit.rating) : "average",
      });

      // If editing and there is existing image_url, show it as preview (but file is null)
      if (bookToEdit.image_url) {
        setPreview(bookToEdit.image_url);
      } else if (bookToEdit.image) {
        setPreview(bookToEdit.image);
      } else {
        setPreview(null);
      }
      setFile(null); // reset picked file
    } else {
      setFormData({ name: "", author: "", rating: "average" });
      setFile(null);
      setPreview(null);
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f || null);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(bookToEdit?.image_url || bookToEdit?.image || null);
    }
  };

  // Revoke preview URL when component unmounts or file changes (cleanup)
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      rating:
        formData.rating !== "" && !isNaN(Number(formData.rating))
          ? Number(formData.rating)
          : formData.rating,
      imageFile: file, // may be null if no new file selected
    };

    // If editing, include id so parent knows to call update; parent handles create/update.
    if (bookToEdit && bookToEdit.id) {
      payload.id = bookToEdit.id;
    }

    onSubmit(payload);

    // clear only when adding new
    if (!bookToEdit) {
      setFormData({ name: "", author: "", rating: "average" });
      setFile(null);
      setPreview(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">
        {bookToEdit ? "Edit Book" : "Add New Book"}
      </h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Judul Buku:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan Judul Buku"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Penulis:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama penulis"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Rating (angka 1-5 atau kata: excellent/average/bad):
          </label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-200 cursor-pointer shadow-sm font-semibold text-gray-700"
            required
          >
            <option value="excellent">⭐⭐⭐⭐⭐ Excellent (Sangat Bagus)</option>
            <option value="average">⭐⭐⭐ Average (Biasa Saja)</option>
            <option value="bad">⭐ Bad (Kurang Bagus)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Cover (opsional)</label>
          <input type="file" accept="image/*" onChange={onFileChange} />
          {preview && (
            <div style={{ marginTop: 8 }}>
              <img
                src={preview}
                alt="preview"
                style={{ width: 140, height: 180, objectFit: "cover", borderRadius: 6 }}
              />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            {bookToEdit ? "Simpan Perubahan" : "Tambah Buku"}
          </button>

          {bookToEdit ? (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
            >
              Batal
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setFormData({ name: "", author: "", rating: "average" });
                setFile(null);
                setPreview(null);
              }}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition duration-200"
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookForm;
