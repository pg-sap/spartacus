import {
  ACTIVE_SHIPPING_TAB,
  ACTIVE_TABS_CONTAINER,
  BREADCRUMB_TITLE_SELECTOR,
  TABS_HEADER_LIST,
} from './constants/index';

export const summaryContainer = `cx-product-summary`;
export const infoContainer = `cx-product-intro`;
export const reviewContainer = 'cx-product-reviews';
export const reviewList = `${reviewContainer} .review`;
export const writeAReviewButton = `${reviewContainer} .header button`;
export const writeAReviewForm = `${reviewContainer} form`;
export const addToCartButton = `cx-add-to-cart button`;
export const atcModal = `cx-added-to-cart-dialog`;
export const atcModalTitle = `${atcModal} .cx-dialog-title`;
export const atcModalItem = `${atcModal} cx-cart-item`;
export const atcModalCloseButton = `${atcModal} [aria-label="Close"]`;
export const header = `cx-page-layout[section="header"]`;
export const headerCartButton = `${header} cx-mini-cart .count`;
export const itemCounter = 'cx-item-counter';
export const itemCounterButtons = `${itemCounter} button`;
export const variantSelectorContainer = '.variant-selector';
export const variantStyleList = `${variantSelectorContainer} ul.variant-list`;

export const PRODUCT_NAME = 'Battery Video Light';

export function verifyProductDetails() {
  cy.get(BREADCRUMB_TITLE_SELECTOR).should('contain', PRODUCT_NAME);
  cy.get(`${infoContainer} .code`).should('contain', 'ID 266685');
  cy.get(`${summaryContainer} .summary`).should(
    'contain',
    '20-watt video light compatible with InfoLIYHIUM M-series batteries.'
  );
}

export function verifyCorrectTabs() {
  cy.get(TABS_HEADER_LIST).eq(0).should('contain', 'Product Details');
  cy.get(TABS_HEADER_LIST).eq(1).should('contain', 'Specs');
  cy.get(TABS_HEADER_LIST).eq(2).should('contain', 'Reviews');
  cy.get(TABS_HEADER_LIST).eq(3).should('contain', 'Shipping');
}

export function verifyTextInTabs() {
  cy.get(ACTIVE_TABS_CONTAINER)
    .should(
      'contain',
      '20-watt video light compatible with InfoLIYHIUM M-series batteries.'
    )
    .should(
      'contain',
      'Can be switched to 10-watt or 20-watt settings (NP-FM50 batteries can only be used at 10-watt setting).'
    )
    .should('contain', 'Includes shoe adaptor for increased functionality.');
  cy.get(TABS_HEADER_LIST).eq(1).click();
  cy.get(ACTIVE_TABS_CONTAINER)
    .should('contain', 'Weight & dimensions')
    .should('contain', 'Colour')
    .should('contain', 'Technical details');
  cy.get(TABS_HEADER_LIST).eq(2).click();
  cy.get(ACTIVE_TABS_CONTAINER).should('contain', 'Overall Rating');
  cy.get(TABS_HEADER_LIST).eq(3).click();
  cy.get(ACTIVE_SHIPPING_TAB).should('contain', 'Lorem ipsum dolor sit amet,');
}

export function verifyContentInReviewTab() {
  cy.get(TABS_HEADER_LIST).eq(2).click();
  cy.get(reviewList).should('have.length', 5);
  cy.get(writeAReviewButton).should('be.visible');
}

export function verifyReviewForm() {
  cy.get(writeAReviewButton).click();
  cy.get(writeAReviewForm).should('be.visible');
  cy.get(writeAReviewForm).getByText('Cancel').should('be.not.disabled');
  cy.get(`${writeAReviewForm} input`).eq(0).type('My review title');
  cy.get(`${writeAReviewForm} textarea`).type(
    'My best comment I have ever posted'
  );
  cy.get(`${writeAReviewForm} .star`).eq(2).click();
  cy.get(`${writeAReviewForm} input`).eq(2).type('Me');
  cy.get(writeAReviewForm).getByText('Submit').should('be.not.disabled');
  cy.get(writeAReviewForm).getByText('Submit').click();
  cy.get(writeAReviewForm).should('be.not.visible');
  cy.get(reviewList).should('be.visible');
}

export function verifyQuantityInCart() {
  cy.get(addToCartButton)
    .getByText(/Add To Cart/i)
    .click();
  cy.get(atcModal).should('be.visible');
  cy.get(atcModalTitle).should('contain', 'Item(s) added to your cart');
  cy.get(`${atcModalItem} .cx-name`).should('contain', PRODUCT_NAME);
  cy.get(atcModalCloseButton).click();
  cy.get(headerCartButton).should('contain', '1');
  for (let i = 0; i <= 2; i++) {
    cy.get(itemCounterButtons).getByText('+').click();
  }
  cy.get(addToCartButton)
    .getByText(/Add To Cart/i)
    .click();
  cy.get(atcModalCloseButton).click();
  cy.get(headerCartButton).should('contain', '5');
}

export function selectProductStyleVariant() {
  cy.get(`${variantStyleList} li img[alt="glacier"]`).first().click();

  cy.get(`${variantStyleList} li.selected-variant`).should('be.visible');
}

export function selectProductSizeVariant() {
  cy.get(`${variantStyleList} li img[alt="glacier"]`).first().click();

  cy.get('.variant-selector select').select('M');

  cy.get('cx-add-to-cart .quantity .info').should('contain', 'In stock');
  cy.get('cx-add-to-cart button').should('be.visible');
}

export function selectProductSizeVariantWithoutStock() {
  cy.get(`${variantStyleList} li img[alt="glacier"]`).first().click();

  cy.get('.variant-selector select').select('L');

  cy.get('cx-add-to-cart .quantity .info').should('contain', 'Out of stock');
}
