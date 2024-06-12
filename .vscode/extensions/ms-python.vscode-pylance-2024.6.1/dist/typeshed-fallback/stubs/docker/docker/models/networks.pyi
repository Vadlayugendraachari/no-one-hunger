from typing import Any

from .containers import Container
from .resource import Collection, Model

class Network(Model):
    @property
    def name(self) -> str | None: ...
    @property
    def containers(self) -> list[Container]: ...
    def connect(self, container: str | Container, *args, **kwargs) -> None: ...
    def disconnect(self, container: str | Container, *args, **kwargs) -> None: ...
    def remove(self) -> None: ...

class NetworkCollection(Collection[Network]):
    model: type[Network]
    def create(self, name: str, *args, **kwargs) -> Network: ...  # type:ignore[override]
    def get(self, network_id: str, *args, **kwargs) -> Network: ...  # type:ignore[override]
    def list(self, *args, **kwargs) -> list[Network]: ...
    def prune(self, filters: dict[str, Any] | None = None) -> dict[str, Any]: ...
