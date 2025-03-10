import { Star, ShoppingCart } from "lucide-react";
import useFetch from "../../useFetch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function ProductList({category}) {
    
    const endpoint=category? `https://dummyjson.com/products/category/${category}`
    : `https://dummyjson.com/products`;

    const { addToCart } = useContext(CartContext);
    const { data, loading, error } = useFetch(endpoint);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex pb-5 flex-wrap gap-3 mx-auto justify-center">
            {data.products.slice(0, 15).map((product) => (
                <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-[215px] hover:shadow-xl"
                >
                    {/* Hình ảnh sản phẩm */}
                    <Link to={`/products/${product.id}`} className="block relative">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-44 object-cover rounded-lg"
                        />
                        {product.stock < 10 && (
                            <span className="absolute top-2 left-2 bg-[#ee4d2e] text-white text-xs px-2 py-1 rounded">
                                Low Stock
                            </span>
                        )}
                    </Link>

                    {/* Nội dung sản phẩm */}
                    <div className="mt-3">
                        <Link to={`/products/${product.id}`} className="block">
                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-10">
                                {product.title}
                            </h3>
                        </Link>
                        <p className="text-xs text-gray-500">{product.brand}</p>

                        {/* Giá và khuyến mãi */}
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-lg font-bold text-[#ee4d2e]">
                                ${product.price.toFixed(2)}
                            </p>
                            {product.discountPercentage > 0 && (
                                <span className="text-xs text-gray-500 line-through">
                                    ${(
                                        product.price /
                                        (1 - product.discountPercentage / 100)
                                    ).toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Đánh giá */}
                        <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-xs text-gray-700 ml-1">
                                {product.rating} | {product.stock} in stock
                            </span>
                        </div>

                        {/* Nút mua hàng */}
                        <button
                            onClick={() => addToCart(product)}
                            className="mt-3 w-full bg-[#ee4d2e] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#d23c1f] transition-all"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
