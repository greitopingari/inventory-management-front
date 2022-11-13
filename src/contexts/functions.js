import moment from 'moment/moment';

export default function fixDateFormat(str) {
	return moment(str).format('MMMM, Do YYYY');
}
