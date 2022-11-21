import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Input({
	type,
	name,
	id,
	label,
	error,
	value,
	required = false,
	handleChange,
}) {
	const { register } = useFormContext();

	return (
		<>
			<div className="relative z-0 mb-8">
				{handleChange ? (
					<input
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						type={type}
						name={name}
						id={id}
						defaultValue={value}
						{...register(name)}
						placeholder=" "
						onChange={handleChange}
					/>
				) : (
					<input
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						type={type}
						name={name}
						id={id}
						value={value}
						{...register(name)}
						placeholder=" "
					/>
				)}
				<label
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					htmlFor={id}
				>
					{label} {required ? ' *' : ''}
				</label>
			</div>
			<p className="text-red">{error}</p>
		</>
	);
}
