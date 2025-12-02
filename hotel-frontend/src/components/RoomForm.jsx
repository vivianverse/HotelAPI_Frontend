import { useForm } from "react-hook-form";
import { useEffect } from "react";

/**
 * A reusable form component for creating or editing room data.
 * @param {object} props
 * @param {object|null} props.initial 
 * @param {function} props.onSubmit
 * @param {function} props.onCancel 
 */
export default function RoomForm({ initial = null, onSubmit, onCancel }) {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm({
    defaultValues: initial || { number: "", type: "", price: "" },
  });

  useEffect(() => {
    reset(initial || { number: "", type: "", price: "" });
  }, [initial, reset]);

  const submit = (data) => {
    onSubmit && onSubmit({ 
      number: data.number, 
      type: data.type, 
      price: Number(data.price) 
    });

    if (!initial) {
      reset({ number: "", type: "", price: "" });
    }
  };

  const isEditing = !!initial;

  return (
    <form 
      onSubmit={handleSubmit(submit)} 
      className="flex flex-col sm:flex-row gap-4 items-start sm:items-end p-4 border border-gray-200 rounded-lg bg-gray-50"
    >
      
      {/* Input Group: Room Number */}
      <div className="flex-1 w-full">
        <label htmlFor="number" className="block text-sm font-medium text-gray-700 sr-only">Room Number</label>
        <input 
          id="number"
          placeholder="Room Number" 
          {...register("number", { required: "Room number is required" })} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        />
        {errors.number && <p className="mt-1 text-xs text-red-600 font-medium">{errors.number.message}</p>}
      </div>

      {/* Input Group: Type */}
      {/* <div className="flex-1 w-full">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 sr-only">Type (Single/Double)</label>
        <input 
          id="type"
          placeholder="Type (Single/Double)" 
          {...register("type", { required: "Room type is required" })} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        />
        {errors.type && <p className="mt-1 text-xs text-red-600 font-medium">{errors.type.message}</p>}
      </div> */}

      {/* Select Group */}
      <div className="flex-1 w-full relative">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 sr-only">Room Type</label>
        <select 
          id="type"
          {...register("type", { required: "Room type is required" })} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 bg-white appearance-none pr-8"
        >
          <option value="" disabled>Select Room Type</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
        </select>
        {errors.type && <p className="mt-1 text-xs text-red-600 font-medium">{errors.type.message}</p>}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>

      {/* Input Group: Price */}
      <div className="flex-1 w-full">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 sr-only">Price</label>
        <input 
          id="price"
          placeholder="Price" 
          type="number" 
          step="0.01"
          {...register("price", { 
            required: "Price is required",
            min: { value: 0.01, message: "Price must be greater than 0" }
          })} 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        />
        {errors.price && <p className="mt-1 text-xs text-red-600 font-medium">{errors.price.message}</p>}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 min-w-max">
        <button 
          type="submit" 
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition duration-200 shadow-md 
            ${isEditing 
              ? "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500" 
              : "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
            } focus:outline-none focus:ring-4 focus:ring-opacity-50`}
        >
          {isEditing ? "Update Room" : "Add Room"}
        </button>
        
        {isEditing && (
          <button 
            type="button" 
            onClick={onCancel}
            className="px-6 py-2 rounded-lg text-sm font-medium transition duration-200 bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50 shadow-md"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}