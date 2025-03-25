import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import React from 'react';
import ProductTable from './components/ProductTable';

const ProductManagement = () => {

    const breadcrumbs = ['Admin Dashboard', 'Inventory Module'];
  return (
		<div className="">
			<HeaderLayout
				moduleName="Inventory Module"
				moduleLink="/inventory/overview"
				page="Product management"
				pageLink="/inventory/product-management"
				breadcrumbs={breadcrumbs}
			/>

			<div className="px-4">
				<div className="bg-secondary rounded-2xl">
					<div className="w-full sm:px-4 px-4 py-2">
						<ProductTable />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductManagement