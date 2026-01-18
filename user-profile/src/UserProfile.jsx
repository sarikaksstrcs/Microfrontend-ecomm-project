const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userData = {
      id: faker.datatype.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.person.email(),
      joinDate: '2024-01-15',
      avatar: faker.image.url(200, 200),
    };
    setUser(userData);

    const ordersData = Array.from({ length: 5 }, () => ({
      id: faker.datatype.uuid(),
      date: `2025-01-${faker.datatype.number({ min: 1, max: 18 })}`,
      total: parseFloat(faker.commerce.price(50, 500)),
      status: ['Delivered', 'Shipped', 'Processing'][faker.datatype.number({ min: 0, max: 2 })],
      items: faker.datatype.number({ min: 1, max: 5 }),
    }));
    setOrders(ordersData);
  }, []);

  if (!user) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-6">
          <img src={user.avatar} alt={user.firstName} className="w-24 h-24 rounded-full" />
          <div>
            <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">Member since {user.joinDate}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order History
        </h3>
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-600">{order.date} • {order.items} items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};