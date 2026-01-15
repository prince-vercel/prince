export const getCollectionName = (baseName: string, language: string): string => {
  // TR için suffix ekleme, diğer diller için ekle
  return language === 'tr' ? baseName : `${baseName}_${language}`;
};

export const getBaseCollectionName = (localizedName: string): string => {
  // _en, _fr vb. çıkar, TR için zaten yok
  return localizedName.replace(/_(en|fr|de|es|it|pt|ru|zh|ja|ko|ar)$/, '');
};