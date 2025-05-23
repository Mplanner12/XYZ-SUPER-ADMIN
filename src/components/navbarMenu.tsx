"use client"

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { chevronDown2 } from '../../public';

interface Content {
    children: string;
    link: string;
}

interface SelectComponentProps {
    title: string;
    subs: Content[];
}

export default function MenuPopupState({title, subs} : SelectComponentProps) {
	return (
		<PopupState variant="popover" popupId="demo-popup-menu">
			{(popupState) => (
				<React.Fragment>
					<Button
						variant="text"
						{...bindTrigger(popupState)}
						className="flex items-center align-middle text-foundation-purple-purple-400 capitalize gap-10 font-text-xs-medium hover:bg-none"
					>
						{title}
						<Image src={chevronDown2} alt="" />
					</Button>
					<Menu {...bindMenu(popupState)}>
						{subs.map((sub) => (
							<MenuItem key={sub.children} onClick={popupState.close}>
								<Link href={sub.link}>{sub.children}</Link>
							</MenuItem>
						))}
					</Menu>
				</React.Fragment>
			)}
		</PopupState>
	);
}
