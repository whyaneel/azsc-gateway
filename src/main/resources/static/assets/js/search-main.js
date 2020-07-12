var GET_USERS = '/api/search/users';

$(document).ready(function() {
    setTimeout(function() {
        fetchAllUsers();
    }, 1000);
});

function displayUsers(data) {
    var resultsContent = '';
    $.each(data, function(k, v) {
        resultsContent +=
            '<tr>' +
            '<td>' + v.id + '</td>' +
            '<td>' + v.firstName + ' ' + v.lastName + '</td>' +
            '<td>' + (v.addresses.length > 0 ? v.addresses[0] : '') + '</td>' +
            '</tr>';
    });
    $(".results>table>tbody").html(resultsContent);
}

function fetchAllUsers() {
    fetchUsers(GET_USERS)
}

//TODO this should become `search` with multiple combinations
function searchUser() {
    var WINDOW_LOCATION_SEARCH = "?search={search}"
    var term = $('#search').val().trim();
    if (term.length > 3) {
        var bySearchTermUrl = GET_USERS + WINDOW_LOCATION_SEARCH.replace('{search}', term)
        fetchUsers(bySearchTermUrl)
    }
}

function fetchUsers(url) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function(result) {
            displayUsers(result);
        },
        error: function(jqXHR, exception) {
            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status >= 400 && jqXHR.status < 499) {
                $.each(jqXHR.responseJSON.errors, function(index, error) {
                    alert(error.message)
                });
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            }
        }
    });
}