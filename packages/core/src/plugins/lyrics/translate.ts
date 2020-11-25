import logger from 'electron-timber';
import lyrics from 'simple-get-lyrics';
import translate from 'google-translate-open-api';
import { getOption } from '../../index';

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
    const toTranslate = getOption('language').split('-')[0].split('_')[0];

    return lyrics.search(artistName, trackName)
      .then(result => {
        return translate(result.lyrics, {to: toTranslate})
          .then(res => { 
            if (res.data[1] === toTranslate) {
              return result.lyrics; 
            }
            return res.data[0]; 
          }).catch(function (err) {
            logger.log('error', err); return result.lyrics;
          });
      })
      .catch(function (err) {
        logger.log('error', err);
      });
  }
}

export default TranslateLyricsProvider;
