## issues to be fixed

// fix prevent duplicate productIds from being added to a challan in challan.service.ts
Clear field errors when the user edits a field ⭐

Right now, if "Email is invalid" appears, it stays there until the next submit.


extract the empty form objects into constants instead of redefining them in every page. for customers, products like
// src/constants/product.ts

export const EMPTY_PRODUCT_FORM: ProductFormData = {
  name: "",
  sku: "",
  category: "",
  unitPrice: "",
  currentStock: 0,
  minimumStock: 0,
  warehouse: "",
};
const [form, setForm] = useState(EMPTY_PRODUCT_FORM);
