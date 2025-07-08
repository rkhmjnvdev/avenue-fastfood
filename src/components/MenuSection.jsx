import ProductCard from "./ProductCard"

const MenuSection = ({ title, items, onAddToCart }) => {
  return (
    <section className="menu-section">
      <h2 className="section-title fadeInDown">{title}</h2>
      <div className="products-grid">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}

export default MenuSection
