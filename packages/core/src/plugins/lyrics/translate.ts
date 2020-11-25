import logger from 'electron-timber';
import lyrics from 'simple-get-lyrics';

import LyricsProvider from '../lyricsProvider';

class TranslateLyricsProvider extends LyricsProvider {
  constructor() {
    super();
    this.name = 'Translate Lyrics Provider Plugin';
    this.sourceName = 'Translate Lyrics Provider';
    this.description = 'Translate lyrics provider plugin. Uses several sources with fallbacks.';
    this.image = null;
    this.isDefault = false;
  }

  search(artistName: string, trackName: string): string {
    return lyrics.search(artistName, trackName)
      .then(function(result) {
        console.warn(result.lyrics); /* translate.translate("I speak English", {to: 'fr'})
        .then(res => {console.warn(res.text); })
        .catch(err => {console.error(err); }) ;*/ return 'translated lyrics'; 
      }).catch(function (err) {
        logger.log('error', err);
      });
  }
}

export default TranslateLyricsProvider;
