import moment from 'moment/moment';

export default function fixDateFormat(str) {
	return moment(str).format('MMMM, Do YYYY');
}

export function convertImageToBase64(e,setter) {
	const file = e.target.files[0];
	const file_reader = new FileReader();

	file_reader.onloadend = () => {
		setter(file_reader.result.toString());
	};

	file_reader.readAsDataURL(file);
}
