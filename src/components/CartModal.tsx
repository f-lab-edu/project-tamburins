import { PiTrashThin } from 'react-icons/pi';
import { useCart } from '../context/CartContext';

const CartModal = ({ onClose }: { onClose: () => void }) => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  return (
    <div className='fixed inset-0 flex justify-end z-50'>
      <div className='absolute inset-0 bg-black/50' onClick={onClose}></div>
      <div className='relative bg-white h-full w-[480px] shadow-lg transform transition-transform translate-x-0'>
        <div className='flex justify-between items-center p-4 border-b'>
          <h2 className='text-xl font-bold'>쇼핑백</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-black text-2xl'
          >
            &times;
          </button>
        </div>

        <div className='p-4 flex-1 overflow-y-auto'>
          {cartItems.length === 0 ? (
            <p className='text-gray-500 text-center'>
              쇼핑백에 담긴 제품이 없습니다
            </p>
          ) : (
            <ul className='space-y-4'>
              {cartItems.map((item) => (
                <li key={item.id} className='flex justify-between'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-20 h-24 object-cover rounded-md'
                  />
                  <div className='flex flex-col flex-grow ml-4'>
                    <span className='font-medium'>{item.name}</span>
                    <span className='text-gray-600'>
                      ₩{item.price.toLocaleString()}
                    </span>

                    <div className='flex items-center mt-2'>
                      <label className='mr-2 text-sm'>수량</label>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className='border px-2 py-1 rounded-md'
                      >
                        {[...Array(30)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className='ml-4'
                  >
                    <PiTrashThin />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='p-4 border-t'>
          <div className='flex justify-between font-medium text-lg pb-2'>
            <span>총 주문금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
          <button className='w-full py-2 bg-black text-white rounded-md hover:bg-gray-900'>
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
