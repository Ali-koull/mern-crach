import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products: products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully." };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  updateProduct: async (productId, updatedProduct) => {
    const { name, price, image } = updatedProduct;
    if (
      typeof name !== "string" ||
      !name.trim() ||
      price === "" ||
      price === undefined ||
      price === null ||
      !Number.isFinite(Number(price)) ||
      typeof image !== "string" ||
      !image.trim()
    ) {
      return { success: false, message: "All fields are required." };
    }

    const res = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Failed to update product.",
      };
    }

    set((state) => ({
      products: state.products.map((product) =>
        product._id === productId ? data.data : product
      ),
    }));
    return { success: true, message: "Product updated successfully." };
  },
  deleteProduct: async (ProductId) => {
    const res = await fetch(`/api/products/${ProductId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if(!data.success) return { success: false, message: data.message };
    set((state) => ({ products: state.products.filter((product) => product._id !== ProductId) }));
    return { success: true, message: "Product deleted successfully." };
  },
}));
