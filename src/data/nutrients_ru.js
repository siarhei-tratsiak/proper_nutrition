const nutrients = [
  [1002, 'Азот', 'г', 202, 500],
  [1003, 'Белки', 'г', 203, 600],
  [1004, 'Жиры', 'г', 204, 800],
  [1005, 'Углеводы', 'г', 205, 1110],
  [1007, 'Зола', 'г', 207, 1000],
  [1008, 'Энергия', 'ккал', 208, 300],
  [1009, 'Крахмал', 'г', 209, 2200],
  [1010, 'Сахароза', 'г', 210, 1600],
  [1011, 'Глюкоза (декстроза)', 'г', 211, 1700],
  [1012, 'Фруктоза', 'г', 212, 1800],
  [1013, 'Лактоза', 'г', 213, 1900],
  [1014, 'Мальтоза', 'г', 214, 2000],
  [1018, 'Спирт, этил', 'г', 221, 18200],
  [1024, 'Удельный вес', 'SP_гR', 227, 999999],
  [1026, 'Уксусная кислота', 'мг', 230, 2900],
  [1032, 'Лимонная кислота', 'мг', 236, 3500],
  [1038, 'Молочная кислота', 'мг', 242, 4100],
  [1039, 'Малиновая кислота', 'мг', 243, 4200],
  [1050, 'Углеводы', 'г', 205, 2, 1120],
  [1051, 'Вода', 'г', 255, 100],
  [1056, 'Сорбит', 'г', 261, 2600],
  [1057, 'Кофеин', 'мг', 262, 18300],
  [1058, 'Теобромин', 'мг', 263, 18400],
  [1062, 'Энергия', 'кДж', 268, 400],
  [1063, 'Сахара', 'г', 269, 3, 1500],
  [1072, 'Углеводы, прочее', 'г', 284, ''],
  [1075, 'Галактоза', 'г', 287, 2100],
  [1078, 'Ксилит', 'г', 290, 2700],
  [1079, 'Клетчатка', 'г', 291, 1200],
  [1081, 'Рибоза', 'г', 294, 999999],
  [1082, 'Волокно растворимое', 'г', 295, 1240],
  [1084, 'Волокно нерастворимое', 'г', 297, 1260],
  [1085, 'Общий жир (NLEA)', 'г', 298, 900],
  [1086, 'Всего сахарных спиртов', 'г', 299, 999999],
  [1087, 'Кальций, Са', 'мг', 301, 5300],
  [1088, 'Хлор, Cl', 'мг', 302, 999999],
  [1089, 'Железо, Fe', 'мг', 303, 5400],
  [1090, 'Магний, Mg', 'мг', 304, 5500],
  [1091, 'Фосфор, P', 'мг', 305, 5600],
  [1092, 'Калий, К', 'мг', 306, 5700],
  [1093, 'Натрий, Na', 'мг', 307, 5800],
  [1094, 'Сера, S', 'мг', 308, 6241],
  [1095, 'Цинк, Zn', 'мг', 309, 5900],
  [1096, 'Хром, Cr', 'мкг', 310, 999999],
  [1097, 'Кобальт, Co', 'мкг', 311, 6244],
  [1098, 'Медь, Cu', 'мг', 312, 6000],
  [1099, 'Фтор, F', 'мкг', 313, 6240],
  [1100, 'Йод, I', 'мкг', 314, 6150],
  [1101, 'Марганец, Mn', 'мг', 315, 6100],
  [1102, 'Молибден, Мо', 'мкг', 316, 6243],
  [1103, 'Селен, Se', 'мкг', 317, 6200],
  [1104, 'Витамин А', 'IU', 318, 7500],
  [1105, 'Ретинол', 'мкг', 319, 7430],
  [1106, 'Витамин А', 'мкг', 320, 7420],
  [1107, 'Каротин, бета', 'мкг', 321, 7440],
  [1108, 'Каротин, альфа', 'мкг', 322, 7450],
  [1109, 'Витамин Е', 'мг', 323, 7905],
  [1110, 'Витамин D (D2 + D3), международные единицы', 'IU', 324, 8650],
  [1111, 'Витамин D2 (эргокальциферол)', 'мкг', 325, 8710],
  [1112, 'Витамин D3 (холекальциферол)', 'мкг', 326, 8720],
  [1113, '25-гидроксихолекальциферол', 'мкг', 327, 8730],
  [1114, 'Витамин D', 'мкг', 328, 8700],
  [1116, 'Фитоен', 'УГ', 330, 7570],
  [1117, 'Фитофлуен', 'мкг', 331, 7580],
  [1119, 'Зеаксантин', 'мкг', 338, 2, 7564],
  [1120, 'Криптоксантин, бета', 'мкг', 334, 7460],
  [1121, 'Лютеин', 'УГ', 338, 1, 7562],
  [1122, 'Ликопен', 'мкг', 337, 7530],
  [1123, 'Лютеин + зеаксантин', 'мкг', 338, 7560],
  [1124, 'Витамин Е (в первую очередь на этикетке)', 'IU', 340, 999999],
  [1125, 'Токоферол, бета', 'мг', 341, 8000],
  [1126, 'Токоферол, гамма', 'мг', 342, 8100],
  [1127, 'Токоферол, дельта', 'мг', 343, 8200],
  [1128, 'Токотриенол, альфа', 'мг', 344, 8300],
  [1129, 'Токотриенол, бета', 'мг', 345, 8400],
  [1130, 'Токотриенол, гамма', 'мг', 346, 8500],
  [1131, 'Токотриенол, дельта', 'мг', 347, 8600],
  [1137, 'Бор, B', 'мкг', 354, 6245],
  [1146, 'Никель, Ni', 'мкг', 371, 6242],
  [1158, 'Витамин Е', 'мг_ATE', 394, 7800],
  [1159, 'цис-бета-каротин', 'мкг', 321.1, 7442],
  [1160, 'цис-ликопин', 'мкг', 337, 1, 7532],
  [1161, 'цис-лютеин / зеаксантин', 'мкг', 338, 3, 7561],
  [1162, 'Витамин С', 'мг', 401, 6300],
  [1165, 'Тиамин', 'мг', 404, 6400],
  [1166, 'Рибофлавин', 'мг', 405, 6500],
  [1167, 'Ниацин', 'мг', 406, 6600],
  [1170, 'Пантотеновая кислота', 'мг', 410, 6700],
  [1175, 'Витамин B6', 'мг', 415, 6800],
  [1176, 'Биотин', 'УГ', 416, 6850],
  [1177, 'Фолат, всего', 'мкг', 417, 6900],
  [1178, 'Витамин B12', 'мкг', 418, 7300],
  [1180, 'Холин', 'мг', 421, 7220],
  [1181, 'Инозитол', 'мг', 422, 2800],
  [1183, 'Витамин К (Менахинон-4)', 'мкг', 428, 8950],
  [1184, 'Витамин К (дигидрофиллохинон)', 'мкг', 429, 8900],
  [1185, 'Витамин К', 'мкг', 430, 8800],
  [1186, 'Фолиевая кислота', 'мкг', 431, 7000],
  [1187, 'Фолат, еда', 'мкг', 432, 7100],
  [1188, '5-метилтетрагидрофолат (5-MTHF)', 'мкг', 433, 999999],
  [1190, 'Фолат, DFE', 'мкг', 435, 7200],
  [1191, '10-формилфолиевая кислота (10HCOFA)', 'мкг', 436, 999999],
  [1192, '5-формилтетрагидрофолиевая кислота (5-HCOH4', 'мкг', 437, 999999],
  [1194, 'Холин, свободный', 'мг', 450, 7230],
  [1195, 'Холин из фосфохолина', 'мг', 451, 7240],
  [1196, 'Холин из фосфотидилхолина', 'мг', 452, 7250],
  [1197, 'Холин из глицерофосфохолина', 'мг', 453, 7260],
  [1198, 'Бетаин', 'мг', 454, 7290],
  [1199, 'Холин из сфингомиелина', 'мг', 455, 7270],
  [1210, 'Триптофан', 'г', 501, 16300],
  [1211, 'Треонин', 'г', 502, 16400],
  [1212, 'Изолейцин', 'г', 503, 16500],
  [1213, 'Лейцин', 'г', 504, 16600],
  [1214, 'Лизин', 'г', 505, 16700],
  [1215, 'Метионин', 'г', 506, 16800],
  [1216, 'Цистин', 'г', 507, 16900],
  [1217, 'Фенилаланин', 'г', 508, 17000],
  [1218, 'Тирозин', 'г', 509, 17100],
  [1219, 'Валин', 'г', 510, 17200],
  [1220, 'Аргинин', 'г', 511, 17300],
  [1221, 'Гистидин', 'г', 512, 17400],
  [1222, 'Аланин', 'г', 513, 17500],
  [1223, 'Аспарагиновая кислота', 'г', 514, 17600],
  [1224, 'Глутаминовая кислота', 'г', 515, 17700],
  [1225, 'Глицин', 'г', 516, 17800],
  [1226, 'Пролайн', 'г', 517, 17900],
  [1227, 'Серин', 'г', 518, 18000],
  [1228, 'Гидроксипролин', 'г', 521, 18100],
  [1232, 'Цистеин', 'г', 526, 999999],
  [1233, 'Глютамин', 'г', 528, 999999],
  [1234, 'Таурин', 'г', 529, 999999],
  [1235, 'Сахар, добавленный', 'г', 539, 1540],
  [1242, 'Витамин E', 'мг', 573, 7920],
  [1246, 'Витамин B12, прочие', 'мкг', 578, 7340],
  [1253, 'Холестерин', 'мг', 601, 15700],
  [1257, 'Жирные кислоты, транс', 'г', 605, 15400],
  [1258, 'Жирные кислоты, общие насыщенные', 'г', 606, 9700],
  [1259, '4:0', 'г', 607, 9800],
  [1260, '6:0', 'г', 608, 9900],
  [1261, '8:0', 'г', 609, 10000],
  [1262, '10:0', 'г', 610, 10100],
  [1263, '12:0', 'г', 611, 10300],
  [1264, '14:0', 'г', 612, 10500],
  [1265, '16:0', 'г', 613, 10700],
  [1266, '18:0', 'г', 614, 10900],
  [1267, '20:0', 'г', 615, 11100],
  [1268, '18:1', 'г', 617, 12100],
  [1269, '18:2', 'г', 618, 13100],
  [1270, '18:3', 'г', 619, 13900],
  [1271, '20:4', 'г', 620, 14700],
  [1272, '22:6 n-3 (DHA)', 'г', 621, 15300],
  [1273, '22:0', 'г', 624, 11200],
  [1274, '14:1', 'г', 625, 11500],
  [1275, '16:1', 'г', 626, 11700],
  [1276, '18:4', 'г', 627, 14250],
  [1277, '20:1', 'г', 628, 12400],
  [1278, '20:5 n-3 (EPA)', 'г', 629, 15000],
  [1279, '22:1', 'г', 630, 12500],
  [1280, '22:5 n-3 (DPA)', 'г', 631, 15200],
  [1281, '14:1 t', 'г', 821, 15510],
  [1283, 'Фитостерины', 'мг', 636, 15800],
  [1285, 'Стигмастерол', 'мг', 638, 15900],
  [1286, 'Кампестерол', 'мг', 639, 16000],
  [1287, 'Брассикастерин', 'мг', 640, 16100],
  [1288, 'Бета-ситостерин', 'мг', 641, 16200],
  [1289, 'Кампестанол', 'мг', 642, 16221],
  [1292, 'Жирные кислоты, мононенасыщенные общие', 'г', 645, 11400],
  [1293, 'Жирные кислоты, полиненасыщенные общие', 'г', 646, 12900],
  [1294, 'Бета-ситостанол', 'МГ', 647, 16221],
  [1296, 'Дельта-5-авенастерин', 'МГ', 649, 16221],
  [1298, 'Фитостерины прочие', 'мг', 651, 16221],
  [1299, '15:0', 'г', 652, 10600],
  [1300, '17:0', 'г', 653, 10800],
  [1301, '24:0', 'г', 654, 11300],
  [1303, '16:1 t', 'г', 662, 15520],
  [1304, '18:1 t', 'г', 663, 15521],
  [1305, '22:1 t', 'г', 664, 15550],
  [1306, '18:2 t дополнительно не определено', 'г', 665, 15610],
  [1307, '18:2 i', 'г', 666, 13350],
  [1310, '18:2 t, t', 'г', 669, 15615],
  [1311, '18:2 CLA', 'г', 670, 13300],
  [1312, '24:1 c', 'г', 671, 12800],
  [1313, '20:2 n-6 c, c', 'г', 672, 14300],
  [1314, '16:1 c', 'г', 673, 11800],
  [1315, '18:1 c', 'г', 674, 12200],
  [1316, '18:2 n-6 c, c', 'г', 675, 13200],
  [1317, '22:1 c', 'г', 676, 12600],
  [1321, '18:3 n-6 c, c, c', 'г', 685, 14100],
  [1323, '17:1', 'г', 687, 12000],
  [1325, '20:3', 'г', 689, 14400],
  [1329, 'Жирные кислоты, общие транс-моноеновые', 'г', 693, 15500],
  [1330, 'Жирные кислоты, общие транс-диеновые', 'г', 694, 15601],
  [1331, 'Жирные кислоты, общие транс-полиеновые', 'г', 695, 15619],
  [1332, '13:0', 'г', 696, 10400],
  [1333, '15:1', 'г', 697, 11600],
  [1334, '22:2', 'г', 698, 15100],
  [1335, '11:0', 'г', 699, 10200],
  [1368, 'Эпигаллокатехин-3-галлат', 'мг', 753, 20700],
  [1403, 'Инулин', 'г', 806, 999999],
  [1404, '18:3 n-3 c, c, c (ALA)', 'г', 851, 14000],
  [1405, '20:3 n-3', 'г', 852, 14500],
  [1406, '20:3 n-6', 'г', 853, 14600],
  [1408, '20:4 n-6', 'г', 855, 14900],
  [1409, '18:3i', 'г', 856, 14200],
  [1410, '21:5', 'г', 857, 15100],
  [1411, '22:4', 'г', 858, 15160],
  [1412, '18:1-11 t (18:1t n-7)', 'г', 859, 12310],
  [1414, '20:3 n-9', 'г', 861, 14650],
  [2000, 'Сахара, всего, включая NLEA', 'г', 269, 1510],
  [2003, '5:0', 'г', 632, 9850],
  [2004, '7:0', 'г', 633, 9950],
  [2005, '9:0', 'г', 634, 10050],
  [2006, '21:0', 'г', 681, 11150],
  [2007, '23:0', 'г', 682, 11250],
  [2008, '12:1', 'г', 635, 11450],
  [2009, '14:1 c', 'г', 822, 11501],
  [2010, '17:1 c', 'г', 825, 12001],
  [2012, '20:1 c', 'г', 829, 12401],
  [2013, '20:1 t', 'г', 830, 15540],
  [2014, '22:1 n-9', 'г', 676.1, 12601],
  [2015, '22:1 n-11', 'г', 676.2, 12602],
  [2016, '18:2 c', 'г', 831, 13150],
  [2018, '18:3 c', 'г', 833, 13910],
  [2019, '18:3 t', 'г', 834, 15660],
  [2020, '20:3 c', 'г', 835, 14450],
  [2021, '22:3', 'г', 683, 14675],
  [2022, '20:4 c', 'г', 836, 14750],
  [2023, '20:5 c', 'г', 837, 14950],
  [2024, '22:5 c', 'г', 838, 15150],
  [2025, '22:6 c', 'г', 839, 15250],
  [2026, '20:2 c', 'г', 840, 14250],
  [2028, 'транс-бета-каротин', 'мкг', 321.2, 7444],
  [2029, 'транс-ликопин', 'мкг', 337.2, 7534],
  [2032, 'Криптоксантин, альфа', 'мкг', 335, 7461],
  [2033, 'Общее количество пищевых волокон (AOAC 2011.25)', 'г', 293, 1300]
]

export { nutrients }
