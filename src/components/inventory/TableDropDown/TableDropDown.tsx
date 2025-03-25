import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface TableDropdownOption {
	label: string;
	action: () => void;
}
interface TableDropDownProps {
  icon?: React.ReactNode;
  options: any; 
}

const TableDropDown: React.FC<TableDropDownProps> = ({ options, icon } : any) => {

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const handleButtonClick = (action: () => void) => {
		if (typeof action === 'function') {
			action();
		}
		handleClose();
	};

	return (
		<div>
			<div
				aria-describedby={id}
				className="cursor-pointer"
				data-testid="dropdown-icon"
				onClick={handleClick}
			>
				{icon || <BsThreeDotsVertical />}
			</div>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				sx={{ borderRadius: '20px' }}
			>
				{Array.isArray(options) &&
					options.map((option: any, index: any) => (
						<Typography
							sx={{ borderRadius: '20px', padding: '1px' }}
							key={index}
						>
							<button
								className={`${
									option === 'Delete Account' ? 'text-red-500' : 'text-gray-900'
								} group flex w-full items-center hover:bg-[#ececec] px-4 py-1 !text-[13px]`}
								onClick={() => handleButtonClick(option.action)}
							>
								{option.label}
							</button>
						</Typography>
					))}
			</Popover>
		</div>
	);
}

export default TableDropDown;