import React, { useContext } from 'react';
import { ThemeContext, ThemeProvider } from '../contexts/ThemeContext';

function Layout({ children, startingTheme }) {
	return (
		<ThemeProvider startingTheme={startingTheme}>
			<LayoutNoThemeProvideer>{children}</LayoutNoThemeProvideer>
		</ThemeProvider>
	);
}

function LayoutNoThemeProvideer({ children }) {
	
	const { theme } = useContext(ThemeContext);

	return (
		<div
			className={
				theme === 'light' ? 'container-fluid light' : 'container-fluid dark'
			}
		>
			{children}
		</div>
	);
}

export default Layout;
