/* eslint-disable flowtype/require-valid-file-annotation */
import {clearTranslations, setTranslations, translate} from '../Translator';
import log from 'loglevel';

jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));

beforeEach(() => {
    clearTranslations();
});

test('Translator should translate translations', () => {
    setTranslations({'save': 'Save', 'delete': 'Delete'});

    expect(translate('save')).toBe('Save');
    expect(translate('delete')).toBe('Delete');
});

test('Translator should return key when translating non-existing keys and log a warning', () => {
    expect(translate('not-existing')).toBe('not-existing');
    expect(log.warn).toBeCalled();
});
