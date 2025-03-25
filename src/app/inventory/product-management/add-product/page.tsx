import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import React from 'react';
import AddProductComponent from '../components/AddProduct/AddProduct';

const AddProductPage = () => {
    
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

			<div className="w-full sm:px-14 px-4">
				<AddProductComponent />
			</div>
		</div>
	);
}

export default AddProductPage;