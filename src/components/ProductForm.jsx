import { useState } from "react"

export default function ProductForm({ categories, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category: categories[0],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.category) return
    onAdd(form.category, {
      name: form.name,
      description: form.description,
      price: parseInt(form.price),
      stock: parseInt(form.stock),
      image: form.image || "/placeholder.svg",
    })
    setForm({ ...form, name: "", description: "", price: "", stock: "", image: "" })
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <h3>➕ Добавить новый товар</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Название" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Описание" />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Цена" required />
      <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Остаток" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Картинка (URL)" />
      <select name="category" value={form.category} onChange={handleChange}>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit">Добавить</button>
    </form>
  )
}
