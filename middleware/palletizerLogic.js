calculateRows_O = (usablePalletWidth, usablePalletLength, productWidth, productLength) => {
  const productsInPalletWidth = Math.floor(usablePalletWidth / productWidth);
  const productsInPalletLength = Math.floor(usablePalletLength / productLength);

  return productsInPalletWidth * productsInPalletLength;
};

calculateRows_M = (usablePalletWidth, usablePalletLength, productWidth, productLength) => {
  //Check with 1 horizontal row, how many products are there:
  const booksHorizontally_oneRow = Math.floor(usablePalletLength / productLength);
  const productsInPalletWidth = Math.floor((usablePalletWidth - productWidth) / productLength); // - product width, because 1 row is horizontaly positioned
  const productsInPalletLength = Math.floor(usablePalletLength / productWidth);
  const booksVertically = productsInPalletWidth * productsInPalletLength;
  const oneHorizontalRowResult = booksHorizontally_oneRow + booksVertically;

  //Check with 2 horizontal rows, how many products are there:
  const booksHorizontally_twoRows = Math.floor(usablePalletLength / productLength);
  const productsInPalletWidthWithTwoRows = Math.floor((usablePalletWidth - productWidth * 2) / productLength); // - product width * 2, because 2 rows are horizontaly positioned
  const productsInPalletLengthWithTwoRows = Math.floor(usablePalletLength / productWidth);
  const booksVerticallyWithTwoRows = productsInPalletWidthWithTwoRows * productsInPalletLengthWithTwoRows;
  const twoHorizontalRowsResult = booksHorizontally_twoRows * 2 + booksVerticallyWithTwoRows;

  return oneHorizontalRowResult >= twoHorizontalRowsResult ? oneHorizontalRowResult : twoHorizontalRowsResult;
};

calculateRows_S = (usablePalletWidth, usablePalletLength, productWidth, productLength) => {
  const booksVertically = Math.floor(usablePalletWidth / productWidth);

  const productsInPalletWidth = Math.floor(usablePalletWidth / productLength); // - product width, because 1 row is horizontaly positioned
  const productsInPalletLength = Math.floor((usablePalletLength - productLength - 20) / productWidth); // -20, because machine is putting 20mm gap between vertical and horizontal rows.

  const booksHorizontally = productsInPalletWidth * productsInPalletLength;

  return booksHorizontally + booksVertically;
};
calculateRows_V = (usablePalletWidth, usablePalletLength, productWidth, productLength) => {
  const productsInPalletWidth = Math.floor(usablePalletWidth / productLength); // - product width, because 1 row is horizontaly positioned
  const productsInPalletLength = Math.floor(usablePalletLength / productWidth);

  return productsInPalletWidth * productsInPalletLength;
};
calculateRows_W = (usablePalletWidth, usablePalletLength, productWidth, productLength) => {
  //Check with 1 vertical row, how many products are there:
  const booksVertically_oneRow = Math.floor(usablePalletLength / productWidth);
  const productsInPalletWidth = Math.floor((usablePalletWidth - productLength) / productWidth); // - product length, because 1 row is horizontaly positioned
  const productsInPalletLength = Math.floor(usablePalletLength / productLength);
  const booksHorizontally = productsInPalletWidth * productsInPalletLength;
  const oneVerticalRowResult = booksVertically_oneRow + booksHorizontally;
  console.log(oneVerticalRowResult);

  //Check with 2 vertical row, how many products are there:
  const booksVertically_twoRows = Math.floor(usablePalletLength / productWidth);
  const productsInPalletWidthWithTwoRows = Math.floor((usablePalletWidth - productLength * 2) / productWidth); // - product length * 2, because 2 rows are horizontaly positioned
  const productsInPalletLengthWithTwoRows = Math.floor(usablePalletLength / productLength);
  const booksHorizontallyWithTwoRows = productsInPalletWidthWithTwoRows * productsInPalletLengthWithTwoRows;
  const twoVerticalRowsResult = booksVertically_twoRows * 2 + booksHorizontallyWithTwoRows;
  console.log(twoVerticalRowsResult);
  return oneVerticalRowResult >= twoVerticalRowsResult ? oneVerticalRowResult : twoVerticalRowsResult;

  // Ar 1 rindu, vecais
  // const booksVertically = Math.floor(usablePalletLength / productWidth);

  // const productsInPalletWidth = Math.floor((usablePalletWidth - productLength) / productWidth); // - product width, because 1 row is horizontaly positioned
  // const productsInPalletLength = Math.floor(usablePalletLength / productLength);

  // const booksHorizontally = productsInPalletWidth * productsInPalletLength;

  // return booksHorizontally + booksVertically;
};
calculateRows_D = (usablePalletWidth, usablePalletLength, productWidth, productLength) => {
  //Check with 1 vertical row, how many products are there:
  const productsInPalletWidth = Math.floor(usablePalletWidth / productWidth);

  const totalBookWidths = productsInPalletWidth * productWidth;
  const booksVertically_oneRow = Math.floor(totalBookWidths / productLength);

  const productsInPalletLength = Math.floor((usablePalletLength - productWidth - 20) / productLength); // - product width, because 1 row is verticaly positioned. -20, because machine is putting 20mm gap between vertical and horizontal rows.
  const booksHorizontally = productsInPalletWidth * productsInPalletLength;
  const oneVerticalRowResult = booksVertically_oneRow + booksHorizontally;
  return oneVerticalRowResult;

  // ATSLĒGTS, JO PIEMĒRS AR EURO PALETI 800x1200 un grāmatu 176x208 nestrādāja. Ar 2 rindām vajadzēja būt 22 grāmatām, kas ir izdevīgāk, bet sistēma vienalga taisīja ar 1 rindu un 19 grāmatas.
  /*
      //Check with 2 vertical row, how many products are there:
      const booksVertically_twoRows = Math.floor(usablePalletWidth / productLength);
      const productsInPalletWidthWithTwoRows = Math.floor(usablePalletWidth / productWidth);
      const productsInPalletLengthWithTwoRows = Math.floor((usablePalletLength - productWidth * 2) / productLength); // - product width * 2, because 2 rows are verticaly positioned
      const booksHorizontallyWithTwoRows = productsInPalletWidthWithTwoRows * productsInPalletLengthWithTwoRows;
      const twoVerticalRowResult = booksVertically_twoRows * 2 + booksHorizontallyWithTwoRows;
      return oneVerticalRowResult >= twoVerticalRowResult ? oneVerticalRowResult : twoVerticalRowResult;
      */
};

calculateRows = function (pallet, product) {
  const usablePalletWidth = pallet.width - 10;
  const usablePalletLength = pallet.length - 10;
  const productWidth = product.width;
  const productLength = product.length;

  const o = calculateRows_O(usablePalletWidth, usablePalletLength, productWidth, productLength);
  const m = calculateRows_M(usablePalletWidth, usablePalletLength, productWidth, productLength);
  const s = calculateRows_S(usablePalletWidth, usablePalletLength, productWidth, productLength);
  const v = calculateRows_V(usablePalletWidth, usablePalletLength, productWidth, productLength);
  const w = calculateRows_W(usablePalletWidth, usablePalletLength, productWidth, productLength);
  const d = calculateRows_D(usablePalletWidth, usablePalletLength, productWidth, productLength);
  return { o, m, s, v, w, d };
};

exports.calculatePackaging = function (product, pallet, packagingRules) {
  console.log(product, pallet, packagingRules);
  //Ammount of products that can fit in one package within max package height of 20cm:
  const productsInOnePackage = Math.floor(200 / product.height);
  //One package height:
  const onePackageHeight = productsInOnePackage * product.height;
  //Total amount of packages for full quantity:
  const totalNumberOfPackages = Math.ceil(product.quantity / productsInOnePackage);

  //Calculate all row combinations:
  const combinations = calculateRows(pallet, product);
  //Make array of object properties. { a: 4, b: 0.5 , c: 0.35, d: 5 } to [4, 0.5 , 0.35, 5]
  const array = Object.values(combinations);
  //Find Max value:
  const packagesOnOneRow = Math.max(...array);

  //Calculate rows on one pallet:
  const availableAmountOfRowsInPallet = Math.floor(packagingRules.maxPalletHeight / onePackageHeight);

  //Max number of packages that pallet allows:
  const availablePackagesOnPallet = Math.floor(packagingRules.maxPalletHeight / onePackageHeight) * packagesOnOneRow;

  //Total number of pallets:
  const totalNumberOfPallets = Math.ceil(totalNumberOfPackages / availablePackagesOnPallet);

  //All Row Combinations:
  const rowCombinations = calculateRows(pallet, product);

  return {
    onePackageHeight,
    productsInOnePackage,
    totalNumberOfPackages,
    packagesOnOneRow,
    availablePackagesOnPallet,
    availableAmountOfRowsInPallet,
    totalNumberOfPallets,
    rowCombinations,
  };
};
