interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface CartModalProps {
  cartItems: CartItem[];
  onClose: () => void;
}

const CartModal = ({ cartItems, onClose }: CartModalProps) => {
  return (
    <div className='fixed inset-0 flex justify-end z-50'>
      <div className='absolute inset-0 bg-black/50' onClick={onClose}></div>
      <div className='relative bg-white h-full w-[480px] shadow-lg transform transition-transform translate-x-0'>
        <div className='flex justify-between items-center p-4 border-b'>
          <h2 className='text-xl font-bold'>장바구니</h2>
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
              장바구니가 비어 있습니다.
            </p>
          ) : (
            <ul className='space-y-4'>
              {cartItems.map((item) => (
                <li key={item.id} className='flex justify-between'>
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='p-4 border-t'>
          <button className='w-full py-2 bg-black text-white rounded-md hover:bg-gray-900'>
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
