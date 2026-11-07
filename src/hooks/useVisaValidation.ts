'use client';

import { useState, useMemo, useCallback } from 'react';

export type CardBrand = 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER' | 'OTHER' | null;
export type BrandStatus = 'ACCEPTED' | 'REJECTED' | 'IDLE' | 'INCOMPLETE';

export interface VisaValidationState {
  cardNumber: string;
  formattedCardNumber: string;
  cardholderName: string;
  expiry: string;
  cvv: string;
  zipCode: string;
  brand: CardBrand;
  brandStatus: BrandStatus;
  validationMessage: string;
  isVisa: boolean;
  isLuhnValid: boolean;
  isLengthValid: boolean;
  isExpiryValid: boolean;
  isCvvValid: boolean;
  isNameValid: boolean;
  isZipValid: boolean;
  isFormValid: boolean;
  errors: {
    cardNumber?: string;
    cardholderName?: string;
    expiry?: string;
    cvv?: string;
    zipCode?: string;
  };
}

/**
 * Standard Luhn Algorithm Implementation
 */
export function validateLuhn(numStr: string): boolean {
  const digits = numStr.replace(/\D/g, '');
  if (digits.length < 13) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    if (isNaN(digit)) return false;

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

/**
 * Detect Credit Card Brand via BIN / IIN Prefix
 */
export function detectCardBrand(digits: string): { brand: CardBrand; isVisa: boolean; isRejectedOther: boolean } {
  if (!digits) {
    return { brand: null, isVisa: false, isRejectedOther: false };
  }

  // Visa: strictly starts with 4
  if (digits.startsWith('4')) {
    return { brand: 'VISA', isVisa: true, isRejectedOther: false };
  }

  // Mastercard: 51-55 or 2221-2720
  if (/^(5[1-5]|2[2-7])/.test(digits)) {
    return { brand: 'MASTERCARD', isVisa: false, isRejectedOther: true };
  }

  // American Express: 34 or 37
  if (/^3[47]/.test(digits)) {
    return { brand: 'AMEX', isVisa: false, isRejectedOther: true };
  }

  // Discover: 6011, 622126-622925, 644-649, 65
  if (/^(6011|622|64[4-9]|65)/.test(digits)) {
    return { brand: 'DISCOVER', isVisa: false, isRejectedOther: true };
  }

  // Any other digit that is not 4
  return { brand: 'OTHER', isVisa: false, isRejectedOther: true };
}

/**
 * Real-time Visa-Only Validation Hook
 */
export function useVisaValidation() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [touched, setTouched] = useState({
    cardNumber: false,
    cardholderName: false,
    expiry: false,
    cvv: false,
    zipCode: false,
  });

  // Digits only
  const cleanDigits = useMemo(() => cardNumber.replace(/\D/g, ''), [cardNumber]);

  // Formatted 4-4-4-4
  const formattedCardNumber = useMemo(() => {
    const parts = cleanDigits.match(/.{1,4}/g);
    return parts ? parts.slice(0, 4).join(' ') : '';
  }, [cleanDigits]);

  // Brand detection via BIN
  const { brand, isVisa, isRejectedOther } = useMemo(
    () => detectCardBrand(cleanDigits),
    [cleanDigits]
  );

  // Visa length check (standard 16 digits, or 13/19)
  const isLengthValid = useMemo(() => {
    return cleanDigits.length === 16 || cleanDigits.length === 13 || cleanDigits.length === 19;
  }, [cleanDigits]);

  // Luhn validity
  const isLuhnValid = useMemo(() => {
    if (!isVisa || !isLengthValid) return false;
    return validateLuhn(cleanDigits);
  }, [isVisa, isLengthValid, cleanDigits]);

  // Status & Messaging
  const brandStatus: BrandStatus = useMemo(() => {
    if (!cleanDigits) return 'IDLE';
    if (isRejectedOther) return 'REJECTED';
    if (isVisa) {
      return isLengthValid && isLuhnValid ? 'ACCEPTED' : 'INCOMPLETE';
    }
    return 'IDLE';
  }, [cleanDigits, isRejectedOther, isVisa, isLengthValid, isLuhnValid]);

  const validationMessage = useMemo(() => {
    if (!cleanDigits) {
      return 'Please enter your 16-digit VISA card number.';
    }
    if (isRejectedOther) {
      return 'Only VISA credit/debit cards are accepted for US orders.';
    }
    if (isVisa) {
      if (!isLengthValid) {
        return `VISA detected — enter ${16 - cleanDigits.length} more digits (${cleanDigits.length}/16)`;
      }
      if (!isLuhnValid) {
        return 'Invalid VISA card number (Checksum failed). Please double check digits.';
      }
      return 'VISA Accepted';
    }
    return '';
  }, [cleanDigits, isRejectedOther, isVisa, isLengthValid, isLuhnValid]);

  // Expiry validation (MM/YY)
  const isExpiryValid = useMemo(() => {
    const match = expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!match) return false;
    const expMonth = parseInt(match[1], 10);
    const expYear = parseInt('20' + match[2], 10);

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    if (expYear > currentYear + 20) return false;
    return true;
  }, [expiry]);

  // CVV validation (3 digits for Visa)
  const isCvvValid = useMemo(() => {
    return /^\d{3}$/.test(cvv);
  }, [cvv]);

  // Name validation
  const isNameValid = useMemo(() => {
    return cardholderName.trim().length >= 3 && /^[a-zA-Z\s.'-]+$/.test(cardholderName);
  }, [cardholderName]);

  // Zip validation (US 5 digits)
  const isZipValid = useMemo(() => {
    return /^\d{5}$/.test(zipCode.trim());
  }, [zipCode]);

  // Overall Form Validity
  const isFormValid = useMemo(() => {
    return isVisa && isLengthValid && isLuhnValid && isExpiryValid && isCvvValid && isNameValid && isZipValid;
  }, [isVisa, isLengthValid, isLuhnValid, isExpiryValid, isCvvValid, isNameValid, isZipValid]);

  // Form field errors
  const errors = useMemo(() => {
    const errs: VisaValidationState['errors'] = {};
    if (touched.cardNumber) {
      if (!cleanDigits) errs.cardNumber = 'Card number is required';
      else if (isRejectedOther) errs.cardNumber = 'Only VISA credit/debit cards are accepted for US orders.';
      else if (!isLengthValid) errs.cardNumber = 'Must be 16 digits';
      else if (!isLuhnValid) errs.cardNumber = 'Invalid VISA card checksum';
    }
    if (touched.cardholderName && !isNameValid) {
      errs.cardholderName = 'Enter full cardholder name';
    }
    if (touched.expiry && !isExpiryValid) {
      errs.expiry = 'Valid MM/YY required';
    }
    if (touched.cvv && !isCvvValid) {
      errs.cvv = '3 digits on back of Visa';
    }
    if (touched.zipCode && !isZipValid) {
      errs.zipCode = '5-digit US billing ZIP';
    }
    return errs;
  }, [touched, cleanDigits, isRejectedOther, isLengthValid, isLuhnValid, isNameValid, isExpiryValid, isCvvValid, isZipValid]);

  // Handlers
  const handleCardNumberChange = useCallback((value: string) => {
    const rawDigits = value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(rawDigits);
    setTouched((prev) => ({ ...prev, cardNumber: true }));
  }, []);

  const handleExpiryChange = useCallback((value: string) => {
    let raw = value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = raw.slice(0, 2) + '/' + raw.slice(2);
    }
    setExpiry(raw);
    setTouched((prev) => ({ ...prev, expiry: true }));
  }, []);

  const handleCvvChange = useCallback((value: string) => {
    const raw = value.replace(/\D/g, '').slice(0, 3);
    setCvv(raw);
    setTouched((prev) => ({ ...prev, cvv: true }));
  }, []);

  const handleNameChange = useCallback((value: string) => {
    setCardholderName(value);
    setTouched((prev) => ({ ...prev, cardholderName: true }));
  }, []);

  const handleZipChange = useCallback((value: string) => {
    const raw = value.replace(/\D/g, '').slice(0, 5);
    setZipCode(raw);
    setTouched((prev) => ({ ...prev, zipCode: true }));
  }, []);

  // Quick Test Fillers for demo / evaluation
  const fillTestVisa = useCallback(() => {
    setCardNumber('4532015928418234'); // Valid Visa passing Luhn
    setCardholderName('SARAH JENNINGS');
    setExpiry('11/28');
    setCvv('842');
    setZipCode('90210');
    setTouched({
      cardNumber: true,
      cardholderName: true,
      expiry: true,
      cvv: true,
      zipCode: true,
    });
  }, []);

  const fillTestRejectedCard = useCallback((type: 'mastercard' | 'amex' | 'discover') => {
    if (type === 'mastercard') {
      setCardNumber('5412751234123456');
    } else if (type === 'amex') {
      setCardNumber('378282246310005');
    } else {
      setCardNumber('6011111111111117');
    }
    setCardholderName('ALEXANDER MORGAN');
    setExpiry('08/27');
    setCvv('912');
    setZipCode('10001');
    setTouched({
      cardNumber: true,
      cardholderName: true,
      expiry: true,
      cvv: true,
      zipCode: true,
    });
  }, []);

  const resetForm = useCallback(() => {
    setCardNumber('');
    setCardholderName('');
    setExpiry('');
    setCvv('');
    setZipCode('');
    setTouched({
      cardNumber: false,
      cardholderName: false,
      expiry: false,
      cvv: false,
      zipCode: false,
    });
  }, []);

  return {
    cardNumber,
    formattedCardNumber,
    cardholderName,
    expiry,
    cvv,
    zipCode,
    brand,
    brandStatus,
    validationMessage,
    isVisa,
    isLuhnValid,
    isLengthValid,
    isExpiryValid,
    isCvvValid,
    isNameValid,
    isZipValid,
    isFormValid,
    errors,
    handleCardNumberChange,
    handleExpiryChange,
    handleCvvChange,
    handleNameChange,
    handleZipChange,
    fillTestVisa,
    fillTestRejectedCard,
    resetForm,
  };
}
