# visualDon-M50-2-Chollet-Sandoz
Exercice de visualisation de donnée

## Contexte
Les données que nous avons choisies se nomment “Domestic Food Prices After COVID-19” ou en français “Prix de la nourriture après la crise COVID-19”. Ces données nous  viennent du site kaggle.com (https://www.kaggle.com/datasets/thedevastator/domestic-food-prices-after-covid-19?resource=download&select=int_clean_data.csv), qui à l’origine viennent de zenodo.org (https://zenodo.org/record/3934925#.ZAs0aC_pNYh). 
L’auteur s’appelle Yao Xinyu. La propagation de la pandémie du COVID-19 à la fin de l’année 2019 a suscité des inquiétudes sur la production alimentaire et les prix des denrées alimentaires, Yao Xinyu a créé cette base de donnée dans ce contexte.


## Description 
Les données sont divisées en quatre fichiers CSV. Les deux premiers indiquent les produits internationaux et les deux derniers indiquent le prix des produits domestiques. Pour les produits internationaux nous avons trois colonnes : date, pays, commoditée et prix. Pour les fichiers domestiques nous avons huits colonnes : pays, type de prix (vente au détails ou en gros), marché , commoditée , taux post-covid et taux annuel avant covid.

Le fichier comporte en tout 17'935 lignes de données.


## But
Découvrir les plus grosses augmentations de prix de nourriture, par pays et par produits. Le but serait de pouvoir donner un aperçu des 10 pires cas de manière interactive avec un storytelling en scroll, allant de l’augmentation de prix la moins forte à la plus forte. 


## Références
Un exemple de présentation de données est disponible par l'auteur original du jeux de données. Il fournit sur le site Zenodo.org, un fichier tableau (logiciel de visualisation). Une fois importé dans le logiciel, nous pouvons voir un top des pays avec la plus grosse augmentation de prix de nourritures. 
