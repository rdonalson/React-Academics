import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Products from './Products';
import { Routes, Route } from 'react-router-dom';
import Cart from './Cart';
import Detail from './Detail';
import Checkout from './Checkout';

export default function App() {
	const [cart, setCart] = useState(() => {
		try {
			return JSON.parse(localStorage.getItem('cart')) ?? '[]';
		} catch (error) {
			console.error(`The cart could not be parsed into JSON: ${error}`);
			return [];
		}
	});

	useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

	function addToCart(id, sku) {
		setCart((items) => {
			const itemInCart = items.find((i) => i.sku === sku);
			if (itemInCart) {
				return items.map((i) => {
					// return new array with the matching itme replaced
					return items.map((i) =>
						i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
					);

					/** Non-ternary */
					// if (i.sku === sku) {
					// 	return { ...i, quantity: i.quantity + 1 };
					// }
					// return i;
				});
			} else {
				// Return a new array with the new item appended
				return [...items, { id, sku, quantity: 1 }];
				// Alternative:
				// return [...items, { id: id, sku: sku, quantity: 1 }];
				// Since fields are the same it is not necessary to specify them
			}
		});
	}

	function updateQuantity(sku, quantity) {
		setCart((items) => {
			// Return a new array with the matching item replaced -> nested ternaries
			return quantity === 0
				? items.filter((i) => i.sku !== sku)
				: items.map((i) => (i.sku === sku ? { ...i, quantity } : i));

			// Alternative: non-ternary
			// if (quantity === 0) {
			// 	return items.filter((i) => i.sku !== sku);
			// }
			// return items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
		});
	}

	function emptyCart() {
		setCart([]);
	}

	return (
		<>
			<div className='content'>
				<Header />
				<main>
					<Routes>
						<Route
							path='/'
							element={<h1>Welcome to Carved Rock Fitness </h1>}
						/>
						<Route path='/:category' element={<Products />} />
						<Route
							path='/:category/:id'
							element={<Detail addToCart={addToCart} />}
						/>
						<Route
							path='/cart'
							element={<Cart cart={cart} updateQuantity={updateQuantity} />}
						/>
						<Route
							path='/checkout'
							element={<Checkout cart={cart} emptyCart={emptyCart} />}
						/>
					</Routes>
				</main>
			</div>
			<Footer />
		</>
	);
}
