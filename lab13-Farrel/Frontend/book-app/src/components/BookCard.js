// // src/components/BookCard.jsx
// import React from "react";

// function BookCard({ book, onEdit, onDelete }) {
//   // Flexible rating display (supports "excellent"/"average"/"bad" or numeric)
//   const getRatingDisplay = (rating) => {
//     if (rating === "excellent") return "⭐⭐⭐ Sangat Bagus";
//     if (rating === "average") return "⭐⭐ Biasa";
//     if (rating === "bad") return "⭐ Kurang Bagus";

//     // numeric case (1-5 expected)
//     const num = Number(rating);
//     if (!isNaN(num) && num > 0) {
//       return "★".repeat(Math.min(5, Math.round(num))) + ` (${num})`;
//     }

//     return "⭐⭐ Biasa";
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     if (isNaN(date)) return dateString;
//     return date.toLocaleDateString("id-ID", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-200">
//       <h3 className="text-xl font-bold text-gray-800 mb-2">📚 {book.name}</h3>

//       <p className="text-gray-600 mb-2">
//         <span className="font-semibold">Penulis:</span> {book.author || "-"}
//       </p>

//       <p className="text-gray-600 mb-2">
//         <span className="font-semibold">Rating:</span>{" "}
//         {getRatingDisplay(book.rating)}
//       </p>

//       <p className="text-gray-500 text-sm mb-4">
//         Ditambahkan: {formatDate(book.uploaded || book.created_at || "")}
//       </p>

//       <div className="flex gap-2">
//         <button
//           onClick={() => onEdit(book)}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
//         >
//           ✏️ Edit
//         </button>
//         <button
//           onClick={() => onDelete(book.id)}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
//         >
//           🗑️ Hapus
//         </button>
//       </div>
//     </div>
//   );
// }

// export default BookCard;

import React from "react";

function BookCard({ book, onEdit, onDelete }) {
  // Flexible rating display (supports "excellent"/"average"/"bad" or numeric)
  const getRatingDisplay = (rating) => {
    if (rating === "excellent") return "⭐⭐⭐ Sangat Bagus";
    if (rating === "average") return "⭐⭐ Biasa";
    if (rating === "bad") return "⭐ Kurang Bagus";

    // numeric case (1-5 expected)
    const num = Number(rating);
    if (!isNaN(num) && num > 0) {
      return "★".repeat(Math.min(5, Math.round(num))) + ` (${num})`;
    }

    return "⭐⭐ Biasa";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Determine image src:
  // Backend may provide 'image_url' (absolute) or 'image' (relative /media/...), handle both.
  const defaultCover = "/default-cover.png"; // let this file exist in public/ or static folder
  const imgSrc =
    book.image_url || // serializer absolute url
    (book.image ? (book.image.startsWith("http") ? book.image : book.image) : null) ||
    defaultCover;

  return (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-200">
      <div className="flex gap-4">
        <img
          src={imgSrc}
          alt={book.name}
          style={{ width: 120, height: 160, objectFit: "cover", borderRadius: 6 }}
          onError={(e) => {
            e.currentTarget.src = defaultCover;
          }}
        />

        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">📚 {book.name}</h3>

          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Penulis:</span> {book.author || "-"}
          </p>

          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Rating:</span> {getRatingDisplay(book.rating)}
          </p>

          <p className="text-gray-500 text-sm mb-4">
            Ditambahkan: {formatDate(book.uploaded || book.created_at || "")}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(book)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              🗑️ Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
