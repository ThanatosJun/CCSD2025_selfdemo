$(document).ready(function() {
    // 點擊搜尋按鈕或下拉選單或按 Enter 執行 search()
    $('#search-button').on('click', search);
    $('#category-order').on('change', search);
    $('#search-box').on('keyup', function(e) {
      if (e.key === 'Enter') {
        search();
      }
    });
    function search(){
        const $results = $("#results");
        $results.empty();
        const query = $("#search-box").val().trim().toLowerCase();
        const orderType = $("#category-order").val();
        const filterData = SEARCH_DATASET.filter(item => {
            return query === "" || $("#search-box").val().trim().toLowerCase().includes(query);
        });
        if (orderType === "title") {
            filterData.sort((a, b) => a.title.localeCompare(b.title));
          }
        else if (orderType === "created_atN") {
            filterData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
        else if (orderType === "created_atO") {
            filterData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        }
        else if (orderType === "popularityH") {
            filterData.sort((a, b) => b.popularity - a.popularity);
        }
        else if (orderType === "popularityL") {
            filterData.sort((a, b) => a.popularity - b.popularity);
        }
        else {
            console.error("catergory wrong!!");
        }

        $("#results-count").text(`共找到 ${filterData.length} 筆項目`);
        if (filterData.length === 0) {
            $results.append("<p>找不到相關結果。</p>");
        }
        else {
            $.each(filterData, function(index, item) {
                const $itemDiv = $("<div class='result-item'></div>");
                $itemDiv.append(`<small>${item.url}</small><br>`);
                $itemDiv.append(`<a href="${item.url}" target="_blank">${item.title}</a>`);
                $itemDiv.append(`<p>${item.text}</p>`);
                $itemDiv.append(`<small>建立時間：${item.created_at}</small><br>`);
                $itemDiv.append(`<small>人氣：${item.popularity}</small><br>`);
                
                $results.append($itemDiv);
            })
        }
    }
  });