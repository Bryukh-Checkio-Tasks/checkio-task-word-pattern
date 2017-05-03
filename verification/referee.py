from checkio import api
from checkio.referees.io import CheckiOReferee
from checkio.referees import cover_codes
from checkio.signals import ON_CONNECT


from tests import TESTS


api.add_listener(
    ON_CONNECT,
    CheckiOReferee(
        tests=TESTS,
        function_name={
            "python": "check_command",
            "js": "checkCommand",
        },
        cover_code={
            'python-27': cover_codes.unwrap_args,
            'python-3': cover_codes.unwrap_args,
            'js-node': cover_codes.js_unwrap_args,
        },
    ).on_ready)
