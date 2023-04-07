#!/bin/bash

# Array of papers with their information
papers=(
  "Zaytar, M. A., & al “Learned Probabilistic Post-processing of Ensemble Precipitation and 2m Temperature Forecasts”, internal review (2022)."
  "Twarakavi, N. K. C., Das, K., Zaytar, M. A., Otieno, F., Singh, J., Silva, B., ... & Godbole, S. (2022)."
  "Big Data Analytics for Climate-Resilient Food Supply Chains: Opportunities and Way Forward. In Data Science in Agriculture and Natural Resource Management (pp. 181-192). Springer, Singapore."
  "Zaytar, M. A., & El Amrani, C. (2021). Satellite image inpainting with deep generative adversarial neural networks. IAES International Journal of Artificial Intelligence, 10(1), 121."
  "Zaytar, M. A., & El Amrani, C. (2021). Satellite Imagery Noising with Generative Adversarial Networks. International Journal of Cognitive Informatics and Natural Intelligence (IJCINI), 15(1), 16-25."
  "Zaytar, M. A., & Amrani, C. E. (2018). MetOp Satellites Data Processing for Air Pollution Monitoring in Morocco. International Journal of Electrical & Computer Engineering (2088-8708), 8(6)."
  "Zaytar, M. A., & El Amrani, C. (2016). Sequence to sequence weather forecasting with long short-term memory recurrent neural networks. International Journal of Computer Applications, 143(11), 7-11."
  "Zaheed, G., Bianca, Z., Akram, Z., Campbell, W., Daniel, S. C., Etienne, E. V., Zubeida, P., (2022, December). A toolbox for weather and climate data discovery and extreme event analysis. In AGU Fall Meeting Abstracts (GC41F- 01)"
  "Daniel, S. C., Campbell, W., Bianca, Z., Johannes, S., Etienne, E. V., Akram, Z., (2022, December). Improving sub-seasonal to seasonal forecast using a time-series transformer. In AGU Fall Meeting Abstracts (A22F-1730)"
  "Zaytar, M. A., Zadrozny, B., Watson, C., Civitarese, D. S., Vos, E. E., Mathonsi, T. M., & Mashinini, T. L. (2022). ML-based Probabilistic Prediction of 2m Temperature and Total Precipitation (No. EGU22-11063). Copernicus Meetings."
  "Patel, Z., Baloyi, G., Watson, C., Zaytar, A., Zadrozny, B., Civitarese, D., ... & Vos, E. (2022). S2S Extreme Weather Featurization: A Global Skill Assessment Study (No. EGU22-12461). Copernicus Meetings."
  "Das, K., Twarakavi, N., Zaytar, A., Otieno, F., & Singh, J. (2021, December). Climate extremes on Crop Yield: A Case Study for USA Corn Belt. In AGU Fall Meeting Abstracts (Vol. 2021, pp. H53C-03)."
  "Twarakavi, C. N. K., Otieno, F., Das, K., Zaytar, M. A., & Singh, J. (2021, October). Climate-aware Forecasting Of Agricultural Produce Across Large Regions. In INFORMS Annual Meeting."
  "Zaytar, M. A., et al. (2020, April) “Digital Farm Twinning in Africa”: The international conference on Learning Representations (ICLR)."
  "Zaytar, M. A., & El Amrani, C. (2020, March). Machine Learning Methods for Air Quality Monitoring. In Proceedings of the 3rd International Conference on Networking, Information Systems & Security (pp. 1-5)."
  "Zaytar, M. A., & El Amrani, C. (2019). The Mediterranean Dialogue Earth Observatory’s Data Pipeline and Current Developments. In The Proceedings of the Third International Conference on Smart City Applications (pp. 1214-1229). Springer, Cham."
  "El Amrani, C., Akram Zaytar, M., Rochon, G. L., & El-Ghazawi, T. (2018, April). Processing EUMETSAT Big Datasets to Monitor Air Pollution. In EGU General Assembly Conference Abstracts (p. 19766)."
  "Zaytar, M. A., & El Amrani, C. (2018, September) “Neural Air Quality Forecasting with Remote Sensors for Africa”: Deep Learning Indaba, Stellenbosch University, South Africa."
  "Akram Zaytar, M., Amrani, C. E., Kharrim, A. E., Ben Ahmed, M., & Bouhorma, M. (2017, October). A Data Processing System to Monitor Emissions from Thermal Plants in Morocco. In Proceedings of the Mediterranean Symposium on Smart City Applications (pp. 175-187). Springer, Cham."
)

# Loop through each paper and create a file
for (( i=0; i<${#papers[@]}; i++ )); do

  # Extract the year, title, and number from the paper string
  year=$(echo "${papers[$i]}" | grep -oE '[0-9]{4}' | head -n1)
  title=$(echo "${papers[$i]}" | grep -oE '^.\d{4})\s(.)..*$' | sed 's/[[:punct:]]//g' | sed 's/\s/-/g' | tr '[:upper:]' '[:lower:]')
  number=$(printf "%02d" $((i+1)))

  # Create the filename
  filename="${year}-10-01-${title}-number-${number}.md"

  # Create the file and write the content to it
  touch "$filename"
  echo "---" >> "$filename"
  echo "title: "${papers[$i]}"" >> "$filename"
  echo "collection: publications" >> "$filename"
  echo "permalink: /publication/${year}-10-01-${title}-number-${number}" >> "$filename"
  echo "---" >> "$filename"
  echo "Recommended citation: ${papers[$i]}" >> "$filename"

done

