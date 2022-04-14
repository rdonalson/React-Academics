import SpeakersToolBar from './SpeakersToolBar';
import SpeakersList from './SpeakersList';
import { SpeakerFilterProvider } from '../contexts/SpeakerFilterContext';

function Speakers() {

	
	return (
		<SpeakerFilterProvider startingShowSessions={false} >
			<SpeakersToolBar />
			<SpeakersList />
		</SpeakerFilterProvider>
	);
}

export default Speakers;
