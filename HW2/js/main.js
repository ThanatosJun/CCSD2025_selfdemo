$(document).ready(function() {
    let filterData = [];
    let currentIndex = 0;
    const itemsPerPage = 10;
    const $results = $("#results");
    const $resultsCount = $("#results-count")
    const $searchButton = $("#search-button");
    const $categoryOrder = $("#category-order");
    const $searchBox = $("#search-box");
    const $loadMoreButton = $('#load-more-button');

    $searchButton.on("click", search);
    $searchBox.on("keyup", function(e) {
      if (e.key === "Enter") {
        search();
      }
    });

    $categoryOrder.on("change", orderSort);

    $loadMoreButton.on("click", displayResults);

    function search(){
        $results.empty();
        const query = $searchBox.val().trim().toLowerCase();
        filterData = SEARCH_DATASET.filter(item => {
            return query === "" || item.title.toLowerCase().includes(query);
        });
        $resultsCount.text(`共找到 ${filterData.length} 筆項目`);
        
        if (filterData.length === 0) {
            $results.append("<p>找不到相關結果。</p>");
            $loadMoreButton.hide();
        }
        else {
            orderSort()
            // displayResults();
        }
    }

    function orderSort() {
        const orderType = $categoryOrder.val();
        $results.empty()
        currentIndex = 0;
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
        };
        console.log(filterData[0]);
        displayResults();
    }

    function displayResults() {
        const nextIndex = currentIndex + itemsPerPage;
        const itemsToShow = filterData.slice(currentIndex, nextIndex);
        $.each(itemsToShow, function(index, item) {
            const $itemDiv = $("<div class='result-item'></div>");
            $itemDiv.append(`<small>${item.url}</small><br>`);
            $itemDiv.append(`<a href="${item.url}" target="_blank">${item.title}</a>`);
            $itemDiv.append(`<p>${item.text}</p>`);
            $itemDiv.append(`<small>建立時間：${item.created_at}</small><br>`);
            $itemDiv.append(`<small>人氣：${item.popularity}</small><br>`);
            
            $results.append($itemDiv);
        })
        currentIndex = nextIndex;
        if (currentIndex >= filterData.length) {
            $loadMoreButton.hide();
        }
        else {
            $loadMoreButton.show();
        }
    }
  });