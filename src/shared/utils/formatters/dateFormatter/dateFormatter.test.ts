import {getFormattedDate, getShortDate, getTimeOnly} from './dateFormatter';

const mockDate = new Date(2025, 8, 22, 10, 30, 0); // 22. září 2025, 10:30 lokální čas
const birthdayDate = new Date(2025, 7, 18, 10, 41, 0); // 18. srpna 2025, 10:41 lokální čas

describe('dateFormatter', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('getFormattedDate', () => {
    describe('with default options', () => {
      it('should return current date in default Czech format when no options provided', () => {
        const result = getFormattedDate();
        expect(result).toBe('22. září 2025');
      });

      it('should return current date in default Czech format when empty options provided', () => {
        const result = getFormattedDate({});
        expect(result).toBe('22. září 2025');
      });
    });

    describe('with custom date', () => {
      it('should format random date from August 2025', () => {
        const augustDate = new Date('2025-08-18T14:30:00.000Z');
        const result = getFormattedDate({date: augustDate});
        expect(result).toBe('18. srpna 2025');
      });

      it('should format random date from March 2025', () => {
        const marchDate = new Date('2025-03-07T09:15:00.000Z');
        const result = getFormattedDate({date: marchDate});
        expect(result).toBe('7. března 2025');
      });
    });

    describe('with different locales', () => {
      const myBirthdayDate = new Date('2025-08-18T10:42:00.000Z');

      it('should format date in Czech locale', () => {
        const result = getFormattedDate({date: myBirthdayDate, locale: 'cs'});
        expect(result).toBe('18. srpna 2025');
      });

      it('should format date in English locale', () => {
        const result = getFormattedDate({date: myBirthdayDate, locale: 'en'});
        expect(result).toBe('18. August 2025');
      });

      it('should fallback to Czech locale for unsupported locale', () => {
        const result = getFormattedDate({
          date: myBirthdayDate,
          locale: 'fr' as any,
        });
        expect(result).toBe('18. srpna 2025');
      });
    });

    describe('edge cases', () => {
      it('should handle last day of the year', () => {
        const lastDay = new Date(2025, 11, 31, 23, 59, 59);
        const result = getFormattedDate({date: lastDay});
        expect(result).toBe('31. prosince 2025');
      });

      it('should handle first day of the year', () => {
        const newYear = new Date('2025-01-01T00:00:00.000Z');
        const result = getFormattedDate({date: newYear});
        expect(result).toBe('1. ledna 2025');
      });
    });

    describe('with different formats', () => {
      it('should format with long date format including day name', () => {
        const result = getFormattedDate({date: birthdayDate, dateFormat: 'EEEE, d. MMMM yyyy'});
        expect(result).toBe('pondělí, 18. srpna 2025');
      });

        it('should format with date and time', () => {
          const result = getFormattedDate({date: birthdayDate, dateFormat: 'd. MMMM yyyy HH:mm'});
          expect(result).toBe('18. srpna 2025 10:41');
        });

      it('should format with ISO date', () => {
        const result = getFormattedDate({date: birthdayDate, dateFormat: 'yyyy-MM-dd'});
        expect(result).toBe('2025-08-18');
      });
    });

    describe('wrapper functions', () => {
      describe('getShortDate', () => {
        it('should return short date format', () => {
          const result = getShortDate({date: birthdayDate});
          expect(result).toBe('18.8.2025');
        });

        it('should work with current date', () => {
          const result = getShortDate();
          expect(result).toBe('22.9.2025');
        });

        it('should work with English locale', () => {
          const result = getShortDate({date: birthdayDate, locale: 'en'});
          expect(result).toBe('18.8.2025');
        });

        it('should work with only locale specified', () => {
          const result = getShortDate({locale: 'en'});
          expect(result).toBe('22.9.2025');
        });
      });

      describe('getTimeOnly', () => {
        it('should return time only', () => {
          const result = getTimeOnly({date: birthdayDate});
          expect(result).toBe('10:41');
        });

        it('should work with current date', () => {
          const result = getTimeOnly();
          expect(result).toBe('10:30');
        });

        it('should work with only locale specified', () => {
          const result = getTimeOnly({locale: 'en'});
          expect(result).toBe('10:30');
        });
      });
    });
  });

  describe('error handling', () => {
    it('should throw error for invalid date', () => {
      expect(() => getFormattedDate({date: new Date('invalid')})).toThrow();
    });
  });
});
